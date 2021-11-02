import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../_services/resource.service';

declare var Dropzone: any;


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: []
})
export class FileUploadComponent implements OnInit {

  constructor(private resourceLoader: ResourceService) { }


  public config = {}
  ngOnInit(): void {
    this.config = {
      url: "about:blank",
      previewTemplate: `<div class="dz-preview dz-file-preview">
      <div class="dz-image">
          <img alt="Dropzone placeholder" data-dz-thumbnail="" />
      </div>

      <div class="dz-details">
          <div class="dz-size">
              <span data-dz-size=""></span>
          </div>

          <div class="dz-filename">
              <span data-dz-name=""></span>
          </div>
      </div>

      <div class="dz-progress progress border-1 brc-yellow-tp2" style="height: 0.75rem;">
          <div class="progress-bar bgc-success dz-upload " role="progressbar" data-dz-uploadprogress=""></div>
      </div>

      <div class="dz-error-message">
          <span data-dz-errormessage=""></span>
      </div>

      <div class="dz-success-mark">
          <span class="fa-stack fa-lg text-150">
              <i class="fa fa-circle fa-stack-2x text-white"></i>
              <i class="fa fa-check fa-stack-1x fa-inverse text-success-m1"></i>
          </span>
      </div>

      <div class="dz-error-mark">
          <span class="fa-stack fa-lg text-150">
              <i class="fa fa-circle fa-stack-2x text-danger-m3"></i>
              <i class="fas fa-exclamation fa-stack-1x fa-inverse text-white"></i>
          </span>
      </div>
  </div>`,
      // autoProcessQueue: false,
      addRemoveLinks: false,
      
      thumbnailHeight: 120,
      thumbnailWidth: 120,
      maxFilesize: 0.5,
      filesizeBase: 1000,
    
      //addRemoveLinks : true,
      //dictRemoveFile: 'Remove',
  
    
      thumbnail: function(file: any, dataUrl: any) {
        if (file.previewElement) {
          file.previewElement.classList.remove('dz-file-preview')
          file.previewElement.querySelectorAll('[data-dz-thumbnail]').forEach((el: any) => {
            el.alt = file.name
            el.src = dataUrl
          })
  
          setTimeout(() =>{
            file.previewElement.classList.add('dz-image-preview') 
          }, 1)
        }
      }  
    }

    try {
      // simulating upload progress
      var minSteps = 6,
      maxSteps = 60,
      timeBetweenSteps = 100,
      bytesPerStep = 100000;
      
      Dropzone.prototype.uploadFiles = function (files: any) {

        var This = this
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
              var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));
  
          for (var step = 0; step < totalSteps; step++) {
            var duration = timeBetweenSteps * (step + 1);
            setTimeout(function (file, totalSteps, step) {
              return () => {
                file.upload = {
                  progress: 100 * (step + 1) / totalSteps,
                  total: file.size,
                  bytesSent: (step + 1) * file.size / totalSteps
                };
  
                This.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                if (file.upload.progress == 100) {
                  file.status = Dropzone.SUCCESS;
                  This.emit("success", file, 'success', null);
                  This.emit("complete", file);
                  This.processQueue();
                }
              };
            }(file, totalSteps, step), duration);
          }// fpr step
        }//for i
  
      }
    }
    catch(err) {

    }


    this.resourceLoader.prependCSS('https://cdn.jsdelivr.net/npm/dropzone/dist/dropzone.min.css')

  }

  

}
