---
title: Blender Day 2 - Lowpoly house
date: 2026-02-12T20:21:00.000+09:00
description: Day 2 of learning blender, building a lowpoly house, more
  shortcuts, Object mode & Edit mode and default start up files
category: Blender
sections:
  - imageAlign: none
    heading: What did i do ?
    text: >-
      Day 2 of blender i built a very lowpoly house. This was honestly exciting
      and fun and i learnt a lot from this simple build. 


      I will outline everything I covered and will go into detail about them later.


      I learnt many shortcuts that make life easier for example scaling, with a object selected `S` will allow you to scale the object to make it larger or smaller, you can choose to scale on the x, y or z axis.


      Using `Z,X,Y` while moving an object with the move gizmo will restrict the movement to that respective axis.


      `B` is the multi select tool, the never of items i forgot this is impressive but this tool allows you to select multiple objects, faces and vertices as one selection. 


      `I` while in edit mode allows you to inset on the face that you have selected.


      `E` key while in edit mode activates the extrude/intrude function allowing you in extrude a surface or intrude a surface.


      `^ + J` with multiple items selected this short cut allows you to group the selected objects as one


      `P` while in edit mode and having to faces of a mesh selected will 


      While in edit you can choose different selection modes, `Edge Select`, `Face Select` or `Vertex Select`
  - imageAlign: none
    text: >-
      #### The 3D Viewport | Outliner | Property Panels


      The 3D viewport is what you first see when you open blender, this is where you will be building, in the viewport is where you will view your 3D objects, move/rotate/scale models, animate, navigate the scene and switch camera views, just naming a few naming everything would be necessary but these are the main things you will, do in the 3D viewport.


      ###### Outliner


      The outliner, is to the right of the 3D viewport, you like to look at it a hierarchy window/scene hierarchy window, here you can see all of the Objects in your scene, they are not all specifically objects but for all intensive purposes we can just call them objects as one.


      ###### Property Panel (Property Editor) 


      The property panels are on the right just under the Outliner or Hierarchy window, the property panel contains all the configuration settings for the active scene and selected object, it contains properties where you can control have an object behaves, looks, renders and interacts with the scene.


      #### Workspace


      At the top of the screen you should see a Workspace tabs bar with different options, Layout, Modelling, Sculpting, UV Editing etc. these are the different workspaces you can edit and work from. They are predefined layout editors tailored for specific tasks.


      The Different Workspaces are:


      * Layout

      * Modelling

      * Sculpting

      * UV Editing 

      * Shading

      * Animation

      * Rendering

      * Compositing

      * Geometry Nodes

      * Scripting 


      #### Object Mode


      Object mode is the default mode you will start in, this mode allows you to perform a number of actions and manipulate objects as a whole, 


      In Object Mode, you can:


      * Move, rotate or scale entire objects

      * Duplicate Objects

      * Parent Objects

      * Add Modifiers

      * Animate its transform


      **Grouping objects**


      You can also group multiple objects and use them as one by `shift + select objects` and then using `^ + J || ctrl + J` this will group the objects and move, scale and rotate them as one.
    heading: The 3D Viewport | Outliner | Property Panels | Workspace | Object Mode
  - imageAlign: none
    text: >-
      #### Edit Mode


      Edit mode is where you to directly modify an objects geometry, namely its Vertices, Edges and faces, this is very useful for customising basic shapes for a beginner like myself but very handy for complex customisations, keep in mind you are editing the Mesh data not the object container.


      Edit mode enables the deletion of individual faces, vertices and edges although there are some nuisances but a quite intuitive, when it comes to the vertices and edges that you should be careful when deleting these. 


      In Edit mode you can select different component edit modes `Vertex, Edge, Face` these are found up in the Editor Header, when you are in Edit mode you can either manually select the desired mode or you can use the `1, 2, 3` keys this will only work if have a keyboard with a Numpad, because enabling the Emulate keypad option disables these shortcuts.


      #### Meshes


      Editing a mesh can be done in Edit mode, the shortcut for swapping between Edit and Object mode is the `tab` key. 


      In Edit mode you edit the mesh directly and not the mesh container, this allows you to contort the mesh however you like. You can choose to edit the `Vertex, Face` or `Edge` of a Mesh. 


      While in edit mode you can use some of the same shortcut used in Object mode:


      \- `S` while a face is selected will allow you to scale the face, this can be done with multiple faces selected 


      \- `E` while a face is selected will extrude the selected face/s


      \- `R` while a face is selected will rotate the face


      \- `I` will inset the selected face


      \- `Shift + D` is the shortcut for duplicate, running this command will duplicate your selection


      #### Layout and Default Startup Files


      Blender is extremely flexible when it comes to the layout, you can customise the layout to your hearts desire. If you do not like the tool shelf it can be hidden by hovering your mouse to the right of it until a drag arrow appears. The N panel can be hidden by...... pressing the `N` key, and once you are tired of seeing the Navigation gizmo that can also be hidden by clicking the gizmo icon in the 3D viewport header.


      After you have customised the blender layout to your preference, blender gives you the ability to save a Default Start up file, your file can start with anything you like in there, I start mine with a Cube, Light and Camera. Doing this will ensure every new blender project you will maintain the same layout.


      > How to:


      `File -> Defaults -> Save Startup file`


      When saving your project by default blender will take the current version of your file and attach a .blend1 extension and it will save the current version with just .blend. basically it is a form of versioning, keeping the old version and saving a new one, although it only keeps 1 copy by default.


      > How to:

       `Edit -> Save & Load.`
    heading: Meshes | Edit Mode | Layout and Default Startup Files
image: /images/uploads/lowpoly-house.jpg
---
#### I learnt.
