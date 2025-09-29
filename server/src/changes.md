Current organization:
src
    |- config
    |   |- jwt.js
    |- controllers
    |   |- auth.controller.js
    |- middleware
    |   |- auth.js
    |- routes
    |   |- auth.routes.js
    |- utils
    |   |- auth.js
    |   |- validation.js
    index.js


Suggest chagnes:
src
    |- config 
    |   |- jwt.js
    <!--Controller and Middleware ideally have the same organization as below but might be able to merge due to lots of overlapping code components (I'll look more into this)-->
    |- controllers
    |   |- auth.controller.js
    |- middleware
    |   |- auth.js
    |- routes
    |   |- CurrentVersion
    |   |   |- User                         <!--User and research role can live here-->
    |   |   |   |- auth.routes.js
    |   |   |- Admin
    |   |   |   |- auth.routes.js           <!--Admin routes-->
    |   |- <!--Beta future development can simply just create a folder and work off there-->
    <!--This should be ok to keep the same-->
    |- utils
    |   |- auth.js
    |   |- validation.js
    index.js
