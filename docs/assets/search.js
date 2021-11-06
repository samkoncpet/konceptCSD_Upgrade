jQuery(function($) {

    var urlParams = new URLSearchParams(window.location.search)
    var query = urlParams.get('q')


    if(query && window._currentPage == '/search') {
        // search
        $('input[type=text][name=q]').val(query);

        function beginSearch() {
            if (window.aceDocsSearchIndex) {
                // load and deserialize lunr index
                var lunrIdx = lunr.Index.load(JSON.parse(window.aceDocsSearchIndex))
                
                // query it
                var results = lunrIdx.search(query)

                if(results.length == 0) {
                    // no results found
                    $('h1 .h-inner').html(`There are no results for <span>"${query}"</span>`)
                    return
                }


                $('h1 .h-inner')
                .html(`<span class="result-count">${results.length}</span> result${results.length > 1 ? 's' : ''} for <span>"${query}"</span>`)
                //$("<h3 class='search-title'>The following page(s) contain your search ...</h3>").insertAfter('h1')

                var ul = $("<ol class='search-list'></ol>").insertAfter('h1')

                var extension = window.location.protocol == 'file:' ? '.html' : ''                

                var positionOfSearchTermsInEachDoc = {} //keep the position of search keywords in docs

                for (var i = 0; i < results.length; i++) {
                    var result = results[i]
                    var path = result.ref

                    var parts = path.split('@') // path is consisted of : 1.path / 2.Title / 3.Parent Title

                    // save positions of the queried keyword in that page
                    var positions = new Array()
                    for (let key in result.matchData.metadata) {
                        var info = result.matchData.metadata[key]
                        for(let pos of info['content']['position']) {
                            positions.push(pos)
                        }
                    }
                    positionOfSearchTermsInEachDoc[parts[0]] = positions


                    // genarate "<a>" element to display a link to the page
                    path = parts[0].replace(/\//, '')
                    var title = `${parts[1]} ${parts[2] ? 'in' : ''} <small>${parts[2]}</small>`

                    var name = path.replace(/\//g, ' &gt; ')
                    if(name == 'README') {
                        name = 'home'
                        path = 'index'
                    }

                    $(`<li class="search-item"><a data-path="${parts[0]}" href="${path}${extension}?highlight=${encodeURI(query)}&q=${encodeURI(query)}">${title}</a></li>`).appendTo(ul)
                }


                if (results.length > 0 && window.aceDocsSearchContent) {
                    // now when user clicks to see a result page, check to see what words should be highlighted
                    // for example if "check" is queried, "checks" , "checking" and "checked" will be highlighted as well
                    // we do so by using the "positions" of the queried term in that doc (page) ... the positions are provided by lunr
                    // also we have saved the document itself alongside the "index"
                    $(document)
                    .on('mousedown touchstart contextmenu', '.search-item a:not([data-href])', function() {
                        var path = this.getAttribute('data-path')
                        if (window.aceDocsSearchContent[path] && positionOfSearchTermsInEachDoc[path]) {
                            var content = window.aceDocsSearchContent[path]

                            var keywords = new Array()
                            for (let pos of positionOfSearchTermsInEachDoc[path]) {
                                keywords.push(content.substr(pos[0], pos[1]).toLowerCase())
                            }

                            var uniqe_keywords = [...new Set(keywords)]
                            uniqe_keywords = uniqe_keywords.join(' ')

                            this.setAttribute('href', this.getAttribute('href').replace(/\?highlight\=.*$/, '') + `?highlight=${encodeURI(uniqe_keywords)}&q=${encodeURI(query)}` )
                            this.setAttribute('data-href', 'done') // we mark is done
                        }
                    })
                }
            }
        }// beginSearch



        var loadedScriptCount = 0
        var lunrIndex = document.createElement('script')
        lunrIndex.onload = function() {
            if(++loadedScriptCount == 2) beginSearch()
        }

        var lunrScript = document.createElement('script')
        lunrScript.onload = function() {
            if(++loadedScriptCount == 2) beginSearch()
        }

        lunrIndex.setAttribute('src', $('script[src*="docs.js"]').attr('src').replace('docs.js' , 'search-index.js'))
        lunrScript.setAttribute('src', $('script[src*="jquery.js"]').attr('src').replace('jquery/dist/jquery.js' , 'lunr/lunr.js'))

        document.body.appendChild(lunrIndex)
        document.body.appendChild(lunrScript)
    }

    // highlight keywords if neeeded
    else {
        // we are in a page coming from search results page
        // so we highlight the keywords
        var highlightme = urlParams.get('highlight')
        var query = urlParams.get('q')

        if (highlightme) {
            $('input[type=text][name=q]').val(query)

            if(window.Mark) {
                var pageContent = $('div.page-main')
                var currentIndex = 0

                var results
                var currentClass = "active-highlight"
                var offsetTop = 120

                var nextBtn = $('#next-highlight-btn')
                var prevBtn = $('#prev-highlight-btn')

                function gotoNext() {
                    if (results.length > 0) {
                        var position, current = results.eq(currentIndex)

                        results.removeClass(currentClass)
                        if (current.length > 0) {
                            current.addClass(currentClass)
                            position = current.offset().top - offsetTop
                            window.scrollTo(0, position)
                        }

                        $('#id-current-match').html(currentIndex + 1)
                    }
                }

                function showResults() {
                    if (results.length > 1) {
                        // show the search (highlight words) next/prev buttons
                        $('#navbar-search-jump')
                        .css('display', 'inline-block')
                        .prepend(`<span style="padding: 0 10px; color: #51575f; font-size: 0.95rem;"><u id="id-current-match"></u> of <u>${results.length}</u> matches</span>`)
                    }

                    currentIndex = 0
                    gotoNext()
                }
        
                
                pageContent
                .mark(highlightme, {
                    done: function() {
                        results = pageContent.find("mark").not("mark mark").not('.language-badge mark')// don't count marks inside marks for example "customize" also contains "custom", so it's double marked , and we ignore te inner one
                        if (results.length > 0) {
                            showResults()
                        }						
                    }
                })


                nextBtn
                .add(prevBtn)
                .on("click", function() {
                    if (results.length) {
                        currentIndex += $(this).is(prevBtn) ? -1 : 1

                        if (currentIndex < 0) {
                            currentIndex = results.length - 1
                        }
                        if (currentIndex > results.length - 1) {
                            currentIndex = 0
                        }

                        gotoNext()
                    }
                })


                $('#clear-highlight-btn')
                .on('click', function() {
                    pageContent.unmark()
                    $('#navbar-search-jump').hide()
                })
            }
        }// end of highlight
    }

})