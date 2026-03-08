---
title: Unity Essentials
date: 2026-03-05T12:41:00.000+09:00
description: The Start of my Unity Journey, covering the Editor, 3D Essentials,
  2D Essentials, Audio Essentials, Programming Essentials and Publishing
  Essentials
category: Unity
tags:
  - Unity
sections:
  - imageAlign: none
    heading: Editor & 3D Essentials
    text: >-
      **Project Window**


      The Project window is where you will find all the files and assets available for use in your project. By default it should be located at the bottom left corner of Unity, the parent folder name is 'Assets' by default.


      **Hierarchy Window** 


      The hierarchy window is on the left side of the Unity Editor, at the top of the window it is labelled 'Hierarchy' this window is where you will view and group all objects that are placed in your scene.


      **Scene view** 


      The Scene view is where you build and arrange your game world. It acts as your camera allowing you to move freely around your scene with full control.


      **Game view**


      Game view is the perspective from which you would play the game or rather Game view is what a player sees when they enter the game


      **Scene View Navigation**


      To move through your scene freely, I like using Flythrough mode using this mode allows your to freely navigate the scene. 


      Flythrough mode is activated by: `Hold Right Mouse + A, W, S, D`


      <h3>Controls</h3>


      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>W</strong></td>
            <td>Move forward</td>
          </tr>
          <tr>
            <td><strong>S</strong></td>
            <td>Move backward</td>
          </tr>
          <tr>
            <td><strong>A</strong></td>
            <td>Move left</td>
          </tr>
          <tr>
            <td><strong>D</strong></td>
            <td>Move right</td>
          </tr>
          <tr>
            <td><strong>Q</strong></td>
            <td>Move down</td>
          </tr>
          <tr>
            <td><strong>E</strong></td>
            <td>Move up</td>
          </tr>
          <tr>
            <td><strong>Mouse movement</strong></td>
            <td>Look around</td>
          </tr>
          <tr>
            <td><strong>Scroll wheel</strong></td>
            <td>Change movement speed</td>
          </tr>
        </tbody>
      </table>


      **Inspector Window**\


      The inspector window is where you go to edit the properties of a selected object, you can add new components/edit components, materials and scripts in this window, you change position and rotation of an object along with several other actions can be done in this window.


      **Rigid Body** 


      Rigid body is a component that can be added to a GameObject to allow it to interact with the Unity Physics engine. When a Rigidbody is added the object becomes affected by physical forces such as gravity, collisions and momentum.


      The components properties can be adjusted in the Inspector window, including the Mass, Drag and Angular Drag values which influence how the object moves and interacts with other objects in the scene.


      **Warning:** If Rigidbody is applied to an object without a collider the physics engine will not detect  collisions. This means the object will fall through other objects and that includes the floor! Unless both objects have a Collider attached. 


      > **\# TIP**

      >

      > In most Unity, objects that need to move or interact using physics have both a **Rigidbody a**nd a **Collider**, while static environment objects (floors, walls, pillars) usually only have Colliders.


      **Colliders**


      A Collider is a component that can be added to a GameObject that defines its physical boundaries for collision detection. When a collider is present the physics engine can detect when objects touch or intersect with one-another.


      There are several Colliders available in Unity, Box, Square, Capsule and Mesh, each designed to approximate different shaped objects.


      Objects will only tag in on collisions if they have a Collider attached.


      **Camera & Directional Light**


      The Camera GameObject can be looked at as a Physical Camera on a movie set, the camera plays a critical role in how your scene is viewed, it determines what part of the scene is rendered and displayed to the player during gameplay. 


      The Camera position and rotation determine what the player sees when the game enters play mode. Different camera placements can dramatically alter how a scene feels and how the player experiences the world.


      The Directional light GameObject simulates a distant light source that illuminates the entire scene. It is for all intensive purposes a Sun and also plays a key role on the mood and feel of games.


      Because the light is treated as coming from an infinite distance, all objects in the scene receive light rays that travel in the same direction.
  - imageAlign: none
    heading: "Audio & Programming Essentials "
    text: >-
      **Audio Listener** 


      An Audio Listener is a Component attached to the Main Camera by default, it acts as the players ears. The closer the Audio listener is to a sound, the louder the sound becomes, the further away, the quieter the sound is. So with this component attached the camera acts as the eyes and ears in the scene. 


      Unity will only allow you to have 1 active Audio Component per scene. If you had multiple sets of ears in a scene, at what volume would you play different sounds ?


      **Audio Clip & Audio Source**


      An Audio Source component is a component that plays sound in the Unity scene, it acts as an origin point of sound, this means that audio will appear to come from the GameObject that an Audio Source is attached to. 


      The volume of the sound can be affected by several factors, such as the distance between the Audi Listener and the Audio source, in some cases the direction the camera is facing can also influence the sound is perceived. This behaviour is controlled through Unity's 2D and 3D settings which determines how sound behaves within the scene.


      **2D & 3D Audio**


      Unity also allows sound to be played as either 2D or 3D audio which determines how sound behaves in relation to the player and the game world. This biggest difference between 2D & 3D Audio is whether the sound is affected by distance & position in the scene.


      **2D Audio** plays at a consistent volume regardless of where the sound is located in the scene. The sound is not affected by distance, direction or the position of the audio listener. Background music is a great example of 2D audio.


      **3D Audio** behaves like sound in the real world, affected by distance, direction and position of the audio listener. As a player moves closer to the sound source, the sound becomes louder and as the player moves further away the sound becomes quieter. Good examples of 3D audio would be footsteps, vehicle engines or environmental sounds.  


      The **Spacial Blend** property in the Audio Source component controls switching between 2D & 3D audio, dragging the dial to 0 (2D) -> The sound is unaffected by position, dragging the dial to 1 (3D) -> The sound behaves spatially in the scene.
  - imageAlign: none
    heading: Publishing Essentials
    text: >-
      **Publish to WebGL**


      Publishing to webGL is surprisingly easy. You do have to run through some steps to prep your game for publishing but it is not very complicated. 


      First you will have to pick/switch profiles:\

      `File -> Build Profiles`


      A list of different profiles should appear such as MacOs, windows, Linux and more. Here you must select a Build profile. 


      A Build profile defines how Unity compiles and exports your game for a specific platform. Selecting a Build profile tells Unity what platform to target, what settings should be used for that platform and which scenes should be included in the Build. 


      > NOTE: If the web platform appears grayed out, it means your must select 'Install with Unity Hub' and the 'WebGL Build Support' module before you can switch to the Web platform


      After you have set your build profile you can select 'Build' , Unity will prompt you asking where you would like to save your build. Entering a name and selecting save will build your game (The first time you Build it may take several minutes, subsequent builds will be faster).


      After the build is complete it is time to select the 'Publish to Play' button at the bottom right of the Build profiles window. This will open a new Publish to Unity Play window, select **Publish** to select your most recent build followed by click **Publish** in order to publish it as a **New game**.


      Once the upload is complete a Project details page will be opened on **Unity Play** the page will allow you to Edit title, description and more, after which, CONGRATULATIONS your project is published to Unity Play.
image: /images/uploads/UnityEssentials.png
---
