---
title: GDD
date: 2026-02-24T13:22:00.000+09:00
description: GDD, Who, What, Where and Why ?
category: Game design
tags:
  - GDD
quiz:
  - multiple: false
    options:
      - correct: true
        text: A highly descriptive living software design document of the design for a
          video game
      - correct: false
        text: A GDD is created and edited by the development team or a lead figurehead
          and is primarily used in the video game industry to organize efforts
          within a development team.
    question: "What is a GDD ? "
sections:
  - imageAlign: none
    heading: Game Design Document
    text: >-
      \

      A Game Design Document or GDD is a clear, structured blueprint that defines how a game plays, how its systems function and how the development team will build and refine it. It is a guiding vision which is used throughout the game development process.


      #### Purpose


      The purpose of a Game design document is to clearly define a games, systems, vision and scope so that the development team can build it consistently, efficiently with no ambiguity.


      A GDD should:


      * Align Vision

        * Designers, Programmers and Artist must all build the same game, not 3 different interpretations of it
      * Reduce Ambiguity (The purpose of a GDD is to turn vague ideas into actionable systems)

        * > Good 
          >
          > Enemies attack every 2–4 seconds. Player has 0.3 sec dodge window. Camera FOV increases 5° during combat.
        * > Bad 
          > The combat should feel intense.
      *

      * Define Scope (Scope Creep destroys indie teams)

        * * Defines what IS in the game
        * Defines what IS NOT in the game
      * Guide Implementation (A programmer should be able to read a system section and know these things)

        * What input exist 
        * What states exist
        * What outputs occur
        * What edge cases exist
      * Preserve Design Intent (Games change during development, a GDD preserves these)

        * Core loops
        * Player Fantasy
        * Pillars
        * Design constraints
  - imageAlign: none
    heading: The Structural Architecture of a Professional Game Design Document
    text: >-
      1. **Vision and Design Pillars** (This section defines the identity,
      direction and strategic intent of the game)


      **Purpose**


      Align the team around a clear creative and market identity.\

      All downstream decisions must support these pillars


      **Includes:**


      * Game Title

      * Genre

      * Platform(s)

      * Target Audience

      * Unique Selling Point (USP)

      * Elevator Pitch (1-3 Sentences)

      * Design Pillars(3-5 guiding principles)


      2. Core Gameplay Loop (This defines the repeatable player experiences, This defines the repeatable player experience.) 


      **Purpose**


      If the core loop lacks clarity or engagement, no amount of polish will fix the game.


      **Core question** 


      What does the player do repeatedly.


      **Includes:**


      * Core loop diagram 

      * Player Actions 

      * Reward System 

      * Progression Hooks


      3. Systems Design (This is the operational core of the document)


      All mechanics must be described in implementable terms


      3.1 Player Systems 


      * Movement 

      * Combat

      * Abilities 

      * Inventory

      * Stats

      * Progression


      Each system should define 


      * Inputs

      * Rules

      * Stats

      * Outputs 

      * Feedback 

      * Edge Cases


      3.2 World Systems


      * AI Behaviour

      * Spawning Rules

      * Physics Rules

      * Environmental Reactions 

      * Encounter Logic 


      3.3 Economy and Mega Systems 


      * Currency Types

      * Resource Generation

      * Upgrade Costs 

      * Balancing Formulas

      * Long-term Progression 

       All mechanics must be described in implementable terms.

      4. World, Narrarative & Level Structure

      5. Presentation Layer

      6. Technical Considerations

      7. Production & Scope Control
---
