jQuery(function($) {
	document.title = $('h1').text() + ' - Ace Admin Docs';
	
	$('a[href^="http"]').attr({target: '_blank', rel: 'noreferrer'});
	
	$('.sidebar a, .footer a, .navbar a').each(function() {
		var href = this.getAttribute('data-href');
		if(href == '#') return;
		if(href == window._currentPage) {
			$(this).closest('li').addClass('active').parents('li').addClass('active open').find('.nav').css('transition', 'none');
		}
	});

	
	/// generate table of contents
	var toc = '';
	$('h2, h3').each(function() {
		toc += '<li class="toc-'+this.tagName.toLowerCase()+'"><a data-target="#'+this.id+'" href="'+location.pathname+'#'+this.id+'">' + $(this).text() + '</a></li>';
	});	
	if(toc) $('.toc').append('<div class="toc-title">Table of contents</div><ul class="nav">' + toc + '</ul>');
	//$('.page-content').after($('.toc'))



	/// highlight active item in TOC and active heading
	var _lastTocActive = null;
	var _lastHeaderActive = null;

	function setTOCActive(el) {
		if(_lastTocActive) _lastTocActive.classList.remove('active')
		_lastTocActive = el;
		_lastTocActive.classList.add('active')
	}
	function setHeaderActive(el) {
		if(_lastHeaderActive) _lastHeaderActive.classList.remove('active')
		_lastHeaderActive = el;
		_lastHeaderActive.classList.add('active')
	}
	///


	/// scroll sidebar to go to active sidebar item
	try {
		var active = document.querySelector('.sidebar .active:not(.open)')
		if(active) active.scrollIntoView(false)		
	} catch(e) {}


	/// highlight the relevant hash target
	function highlightHashTarget() {
		if (!location.hash) return;

		try {
			var target = document.querySelector(location.hash)
			if(target) {
				target.scrollIntoView({
					block: "start"
				})
				setHeaderActive(target)
				var tocItem = document.querySelector('.toc a[data-target="'+location.hash+'"]');
				if(tocItem) setTOCActive(tocItem)
			}
		}
		catch(e) {}
	}

	highlightHashTarget();
	var pauseObserve = 0;
	window.onhashchange = function() {
		pauseObserve = 1;
		highlightHashTarget();
	}
	

	// toggle submenus in sidebar
	$(document).on('click', '.sidebar a', function(e) {
		var href = this.getAttribute('href');
		if(href == '#') {
			e.preventDefault();
			console.log(this)
			this.nextElementSibling.style.transition = '';
			this.parentElement.classList.toggle('open')
		}
	});

	
	// hightlight each toc item when we scroll the page
	var highlight = true;
	if (highlight && window.IntersectionObserver) {
		const observer = new window.IntersectionObserver(([entry]) => {
			
			// temporary fix ... to be fixed later
			// sometimes when a `.toc a` is clicked, we go to a h2/h3 element with `intersectionRatio` ~= 0.999
			// and therefore the next h2/h3 becomes `active`, so let's skip 2 observations to bypass that
			if(pauseObserve == 1) {
				pauseObserve = 2;
				return;
			}
			else if(pauseObserve == 2) {
				pauseObserve = 0;
				return;
			}

			if(entry.intersectionRatio >= 1) {
				setHeaderActive(document.getElementById(entry.target.id))
				setTOCActive(document.querySelector('.toc [data-target="#'+entry.target.id+'"]'))
			}
			else if(document.getElementById(entry.target.id).classList.contains('active')) {
				var targetLi = document.querySelector('.toc [data-target="#'+entry.target.id+'"]').parentElement;
				var activeLi = entry.boundingClientRect.y < 0 ? targetLi.nextElementSibling : targetLi.previousElementSibling;
				if (activeLi) {
					var activeA = activeLi.querySelector('a');
					setHeaderActive(document.querySelector(activeA.getAttribute('data-target')))
					setTOCActive(activeA)
				}
			}		
		  },
		  {
			threshold: [1.0],
			delay: 100
		  }
		)

		$('h2, h3').each(function() {
			observer.observe(this)
		})
	}

	
	// scroll to top button
	$('.btn-scroll-up').on('click', function(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
	});

})