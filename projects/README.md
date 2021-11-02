## ng-ace-demo

This project contains Angular version of Ace's demo. It's provided as an example and you don't need to use it.  

You can run it by using `ng serve` command.

## ng-ace-lib

This project contains Ace's directives and services as a library that you can easily import into your project.  

You can build it by using `ng build` or `ng build --prod` command.  

In `ng-ace-demo` I'm using the library's source files directly in app and not the *built* or *distributed* file inside *dist* folder.  
This allows for easy updating and live-reloading during development of demo app and library.