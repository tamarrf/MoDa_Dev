globals [

  mouse-up?
  tick-delta
  smoke-fine?
  smoke-fine-size
  smoke-fine-color
  smoke-coarse?
  smoke-coarse-size
  smoke-coarse-color
  max-smokes
]

patches-own [
  smokes-on-patch
  temperature-patch
]

breed [trees tree]
breed [smokes smoke]
breed [gray-smokes gray-smoke]
breed [g-squares g-square]

smokes-own [
  step-size
  mass
  typeof
  y-coord
  z-coord
]

to setup
  clear-all
  
  set-default-shape gray-smokes "cloud"
  set-default-shape smokes "circle"
  set-default-shape g-squares "square"
  
  set mouse-up? true
  
  ask patches [
    set pcolor green + 2
    ;;
    if pxcor = 0 and pycor = 0 [ 
      set pcolor red 
      ]
  ]  
  
  set smoke-fine? false
  set smoke-fine-size 2
  set smoke-fine-color gray

  set smoke-coarse? false
  set smoke-coarse-size 1
  set smoke-coarse-color gray

  ask patches [
    if (random 1000) < 1
      [set temperature-patch 4]
  ]
  ask patches [
    if any? neighbors with [temperature-patch = 4] [
      if random 100 < 80 [set temperature-patch 4]]
    ]

  ask patches [
    if temperature-patch != 4 and any? neighbors with [temperature-patch =  4] [set temperature-patch 3]
  ]
  ask patches [
    if temperature-patch != 4 and temperature-patch != 3 and any? neighbors with [temperature-patch =  3] [if random 100 < 30 [set temperature-patch 3]]
  ]
  ask patches [
    if temperature-patch != 4 and temperature-patch != 3 and any? neighbors with [temperature-patch =  3] [set temperature-patch 2]
  ]
  ask patches [
    if temperature-patch != 4 and temperature-patch != 3 and temperature-patch != 2 and any? neighbors with [temperature-patch =  2] [
      if random 100 < 80 [set temperature-patch 2]
    ]
  ]
  ask patches [
    if temperature-patch != 4 and temperature-patch != 3 and temperature-patch != 2 and any? neighbors with [temperature-patch =  2] [set temperature-patch 1]
  ]
  ask patches [
    if temperature-patch != 4 and temperature-patch != 3 and temperature-patch != 2 and temperature-patch != 1 and any? neighbors with [temperature-patch =  1] [if random 100 < 50 [set temperature-patch 1]]
  ]
  ask patches [
    if temperature-patch != 4 and temperature-patch != 3 and temperature-patch != 2 and temperature-patch != 1 and any? neighbors with [temperature-patch =  1] [if random 100 < 50 [set temperature-patch 1]]
  ]
 ask patches [
    if temperature-patch = black [set temperature-patch 0]
 ]
end

to go
  ; add go code here
 
  ask patches [
    set smokes-on-patch count (smokes-here)
  ]  
  
  ask patches with [ pcolor = red ] [
    if smoke-fine? = true [
      sprout-smokes 1 [
        set color [128 128 128 128]
        set size smoke-fine-size
        set heading random (360)
        set step-size 0.1
        set z-coord 0
      ]
    ]
    if smoke-coarse? = true [
      sprout-smokes 1 [
        set color [0 0 200 128]
        set size smoke-coarse-size
        set heading random (360)
        set step-size 0.1
        set z-coord 0
      ]
    ]
  ]
  
  ask smokes [
    if abs xcor >= max-pxcor or abs ycor >= max-pycor [
      die      
    ]
  ]
  
  if side-view [
   side-view-function
  ]
  
  ifelse temperature [
    temp-map
  ]
  [
    ask patches [
      set pcolor green + 2
      if pxcor = 0 and pycor = 0 [ 
        set pcolor red 
      ]
    ]
  ]
    
  tick
end

to move-smoke-downhill
 ;; move-to patch-here  ;; go to patch center
  let p min-one-of neighbors [smokes-on-patch]
  ifelse ([smokes-on-patch] of p < smokes-on-patch) [
    face p
    fd 0.5 / size
    set z-coord (z-coord + step-size / size)
  ]
  [
    set heading random (360)
    fd 0.5 / size
    set z-coord (z-coord + step-size / size)
  ]
end

to wind-effect
  set heading wind-direction
  fd wind-speed / (25 * size)
   set z-coord (z-coord + step-size * wind-speed / (25 * size))
end

to smoke-map
  set max-smokes max [smokes-on-patch] of patches
  ask patches [
    set pcolor white - (count smokes-here) / max-smokes
  ]
end

to side-view-function
  ask patches [
    set pcolor white
    if pycor = 0 [; min-pycor / 2 [
      set pcolor green + 2
    ]
  ]
  ask smokes [
    set y-coord ycor
    set ycor z-coord
  ] 
end

to temp-map
  ask patches [
    (ifelse
      temperature-patch = 4 [set pcolor red + 2]
      temperature-patch = 3 [ set pcolor orange + 2]
      temperature-patch = 2 [ set pcolor yellow + 2]
      temperature-patch = 1 [ set pcolor green + 2]
      temperature-patch = 0 [ set pcolor green + 4])
  ]
end

; --- START BLOCKLY GENERATED NETLOGO ---

;BLOCKLY CODE GOES HERE

; --- END BLOCKLY GENERATED NETLOGO ---

@#$#@#$#@
GRAPHICS-WINDOW
180
110
584
514
-1
-1
4
1
10
1
1
1
0
0
0
1
-50
50
-50
50
1
1
1
ticks
30

BUTTON
185
15
257
48
setup
blocks-set
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
185
60
260
93
go
blocks-go
T
1
T
OBSERVER
NIL
NIL
NIL
NIL
0

PLOT
10
680
613
880
Smoke spread
NIL
NIL
0
10
0
1
true
true
"" ""
PENS
"SW" 1 0 -955883 true "" "plot count smokes with [xcor < 0 and ycor < 0] / (count smokes + 1)"
"SE" 1 0 -13840069 true "" "plot count smokes with [xcor > 0 and ycor < 0] / (count smokes + 1)"
"NW" 1 0 -13791810 true "" "plot count smokes with [xcor < 0 and ycor > 0] / (count smokes + 1)"
"NE" 1 0 -5825686 true "" "plot count smokes with [xcor > 0 and ycor > 0] / (count smokes + 1)"

SLIDER
300
65
449
98
wind-speed
wind-speed
0
50
10
1
1
km/h
HORIZONTAL

SLIDER
300
15
449
48
wind-direction
wind-direction
0
359
90
1
1
º
HORIZONTAL

SWITCH
480
15
580
48
side-view
side-view
1
1
-1000

SWITCH
480
65
580
98
temperature
temperature
1
1
-1000
@#$#@#$#@
## ACKNOWLEDGMENT

This model is from Chapter Three of the book "Introduction to Agent-Based Modeling: Modeling Natural, Social and Engineered Complex Systems with NetLogo", by Uri Wilensky & William Rand.

* Wilensky, U. & Rand, W. (2015). Introduction to Agent-Based Modeling: Modeling Natural, Social and Engineered Complex Systems with NetLogo. Cambridge, MA. MIT Press.

This model is in the IABM Textbook folder of the NetLogo Models Library. The model, as well as any updates to the model, can also be found on the textbook website: http://www.intro-to-abm.com/.

## WHAT IS IT?

This project simulates the spread of a fire through a forest.  It shows that the fire's chance of reaching the right edge of the forest depends critically on the density of trees. This is an example of a common feature of complex systems, the presence of a non-linear threshold or critical parameter. This model extends the Fire Simple Extension 2 model by adding BIG-JUMPS.

## HOW IT WORKS

The fire starts on the left edge of the forest, and spreads to neighboring trees. The fire spreads in four directions: north, east, south, and west.

Unlike the first few Fire models, this adds long distance transmission of fire, which means that fire can jump across unburnt stretches of forest.

## HOW TO USE IT

Click the SETUP button to set up the trees (green) and fire (red on the left-hand side).

Click the GO button to start the simulation.

The DENSITY slider controls the density of trees in the forest. (Note: Changes in the DENSITY slider do not take effect until the next SETUP.)

The PROBABILITY-OF-SPREAD slider affects how the fire spreads from patch to patch.

The SOUTH-WIND-SPEED slider affects how strong the wind is from the south.  You can set it negative to create a north wind.

The WEST-WIND-SPEED slider affects how strong the wind is from the south.  You can set it negative to create a east wind.

The BIG-JUMPS? switch controls whether or not sparks can jump across long distances.

## THINGS TO NOTICE

Compare this model to the Fire Simple Extension 2 model.  How do the sparks affect the results?

Does adding spark jumping change the overall amount of forest burned? Why do you think that might be?

## THINGS TO TRY

Try running the same settings with BIG-JUMPS? turned off and on, how does this affect the results?

## RELATED MODELS

Fire Simple, Fire, Percolation, Rumor Mill

## CREDITS AND REFERENCES

This model is a simplified version of:

* Wilensky, U. (1997).  NetLogo Fire model.  http://ccl.northwestern.edu/netlogo/models/Fire.  Center for Connected Learning and Computer-Based Modeling, Northwestern University, Evanston, IL.

## HOW TO CITE

This model is part of the textbook, “Introduction to Agent-Based Modeling: Modeling Natural, Social and Engineered Complex Systems with NetLogo.”

If you mention this model or the NetLogo software in a publication, we ask that you include the citations below.

For the model itself:

* Wilensky, U. (2006).  NetLogo Fire Simple Extension 3 model.  http://ccl.northwestern.edu/netlogo/models/FireSimpleExtension3.  Center for Connected Learning and Computer-Based Modeling, Northwestern Institute on Complex Systems, Northwestern University, Evanston, IL.

Please cite the NetLogo software as:

* Wilensky, U. (1999). NetLogo. http://ccl.northwestern.edu/netlogo/. Center for Connected Learning and Computer-Based Modeling, Northwestern University, Evanston, IL.

Please cite the textbook as:

* Wilensky, U. & Rand, W. (2015). Introduction to Agent-Based Modeling: Modeling Natural, Social and Engineered Complex Systems with NetLogo. Cambridge, MA. MIT Press.

## COPYRIGHT AND LICENSE

Copyright 2006 Uri Wilensky.

![CC BY-NC-SA 3.0](http://ccl.northwestern.edu/images/creativecommons/byncsa.png)

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License.  To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305, USA.

Commercial licenses are also available. To inquire about commercial licenses, please contact Uri Wilensky at uri@northwestern.edu.

<!-- 2006 -->
@#$#@#$#@
default
true
0
Polygon -7500403 true true 150 5 40 250 150 205 260 250

airplane
true
0
Polygon -7500403 true true 150 0 135 15 120 60 120 105 15 165 15 195 120 180 135 240 105 270 120 285 150 270 180 285 210 270 165 240 180 180 285 195 285 165 180 105 180 60 165 15

arrow
true
0
Polygon -7500403 true true 150 0 0 150 105 150 105 293 195 293 195 150 300 150

box
false
0
Polygon -7500403 true true 150 285 285 225 285 75 150 135
Polygon -7500403 true true 150 135 15 75 150 15 285 75
Polygon -7500403 true true 15 75 15 225 150 285 150 135
Line -16777216 false 150 285 150 135
Line -16777216 false 150 135 15 75
Line -16777216 false 150 135 285 75

bug
true
0
Circle -7500403 true true 96 182 108
Circle -7500403 true true 110 127 80
Circle -7500403 true true 110 75 80
Line -7500403 true 150 100 80 30
Line -7500403 true 150 100 220 30

butterfly
true
0
Polygon -7500403 true true 150 165 209 199 225 225 225 255 195 270 165 255 150 240
Polygon -7500403 true true 150 165 89 198 75 225 75 255 105 270 135 255 150 240
Polygon -7500403 true true 139 148 100 105 55 90 25 90 10 105 10 135 25 180 40 195 85 194 139 163
Polygon -7500403 true true 162 150 200 105 245 90 275 90 290 105 290 135 275 180 260 195 215 195 162 165
Polygon -16777216 true false 150 255 135 225 120 150 135 120 150 105 165 120 180 150 165 225
Circle -16777216 true false 135 90 30
Line -16777216 false 150 105 195 60
Line -16777216 false 150 105 105 60

car
false
0
Polygon -7500403 true true 300 180 279 164 261 144 240 135 226 132 213 106 203 84 185 63 159 50 135 50 75 60 0 150 0 165 0 225 300 225 300 180
Circle -16777216 true false 180 180 90
Circle -16777216 true false 30 180 90
Polygon -16777216 true false 162 80 132 78 134 135 209 135 194 105 189 96 180 89
Circle -7500403 true true 47 195 58
Circle -7500403 true true 195 195 58

circle
false
0
Circle -7500403 true true 0 0 300

circle 2
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240

cloud
false
0
Circle -7500403 true true 13 118 94
Circle -7500403 true true 86 101 127
Circle -7500403 true true 51 51 108
Circle -7500403 true true 118 43 95
Circle -7500403 true true 158 68 134

cow
false
0
Polygon -7500403 true true 200 193 197 249 179 249 177 196 166 187 140 189 93 191 78 179 72 211 49 209 48 181 37 149 25 120 25 89 45 72 103 84 179 75 198 76 252 64 272 81 293 103 285 121 255 121 242 118 224 167
Polygon -7500403 true true 73 210 86 251 62 249 48 208
Polygon -7500403 true true 25 114 16 195 9 204 23 213 25 200 39 123

cylinder
false
0
Circle -7500403 true true 0 0 300

dot
false
0
Circle -7500403 true true 90 90 120

face happy
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 255 90 239 62 213 47 191 67 179 90 203 109 218 150 225 192 218 210 203 227 181 251 194 236 217 212 240

face neutral
false
0
Circle -7500403 true true 8 7 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Rectangle -16777216 true false 60 195 240 225

face sad
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 168 90 184 62 210 47 232 67 244 90 220 109 205 150 198 192 205 210 220 227 242 251 229 236 206 212 183

fish
false
0
Polygon -1 true false 44 131 21 87 15 86 0 120 15 150 0 180 13 214 20 212 45 166
Polygon -1 true false 135 195 119 235 95 218 76 210 46 204 60 165
Polygon -1 true false 75 45 83 77 71 103 86 114 166 78 135 60
Polygon -7500403 true true 30 136 151 77 226 81 280 119 292 146 292 160 287 170 270 195 195 210 151 212 30 166
Circle -16777216 true false 215 106 30

flag
false
0
Rectangle -7500403 true true 60 15 75 300
Polygon -7500403 true true 90 150 270 90 90 30
Line -7500403 true 75 135 90 135
Line -7500403 true 75 45 90 45

flower
false
0
Polygon -10899396 true false 135 120 165 165 180 210 180 240 150 300 165 300 195 240 195 195 165 135
Circle -7500403 true true 85 132 38
Circle -7500403 true true 130 147 38
Circle -7500403 true true 192 85 38
Circle -7500403 true true 85 40 38
Circle -7500403 true true 177 40 38
Circle -7500403 true true 177 132 38
Circle -7500403 true true 70 85 38
Circle -7500403 true true 130 25 38
Circle -7500403 true true 96 51 108
Circle -16777216 true false 113 68 74
Polygon -10899396 true false 189 233 219 188 249 173 279 188 234 218
Polygon -10899396 true false 180 255 150 210 105 210 75 240 135 240

house
false
0
Rectangle -7500403 true true 45 120 255 285
Rectangle -16777216 true false 120 210 180 285
Polygon -7500403 true true 15 120 150 15 285 120
Line -16777216 false 30 120 270 120

leaf
false
0
Polygon -7500403 true true 150 210 135 195 120 210 60 210 30 195 60 180 60 165 15 135 30 120 15 105 40 104 45 90 60 90 90 105 105 120 120 120 105 60 120 60 135 30 150 15 165 30 180 60 195 60 180 120 195 120 210 105 240 90 255 90 263 104 285 105 270 120 285 135 240 165 240 180 270 195 240 210 180 210 165 195
Polygon -7500403 true true 135 195 135 240 120 255 105 255 105 285 135 285 165 240 165 195

line
true
0
Line -7500403 true 150 0 150 300

line half
true
0
Line -7500403 true 150 0 150 150

pentagon
false
0
Polygon -7500403 true true 150 15 15 120 60 285 240 285 285 120

person
false
0
Circle -7500403 true true 110 5 80
Polygon -7500403 true true 105 90 120 195 90 285 105 300 135 300 150 225 165 300 195 300 210 285 180 195 195 90
Rectangle -7500403 true true 127 79 172 94
Polygon -7500403 true true 195 90 240 150 225 180 165 105
Polygon -7500403 true true 105 90 60 150 75 180 135 105

plant
false
0
Rectangle -7500403 true true 135 90 165 300
Polygon -7500403 true true 135 255 90 210 45 195 75 255 135 285
Polygon -7500403 true true 165 255 210 210 255 195 225 255 165 285
Polygon -7500403 true true 135 180 90 135 45 120 75 180 135 210
Polygon -7500403 true true 165 180 165 210 225 180 255 120 210 135
Polygon -7500403 true true 135 105 90 60 45 45 75 105 135 135
Polygon -7500403 true true 165 105 165 135 225 105 255 45 210 60
Polygon -7500403 true true 135 90 120 45 150 15 180 45 165 90

square
false
0
Rectangle -7500403 true true 30 30 270 270

square 2
false
0
Rectangle -7500403 true true 30 30 270 270
Rectangle -16777216 true false 60 60 240 240

star
false
0
Polygon -7500403 true true 151 1 185 108 298 108 207 175 242 282 151 216 59 282 94 175 3 108 116 108

target
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240
Circle -7500403 true true 60 60 180
Circle -16777216 true false 90 90 120
Circle -7500403 true true 120 120 60

tree
false
0
Circle -7500403 true true 118 3 94
Rectangle -6459832 true false 120 195 180 300
Circle -7500403 true true 65 21 108
Circle -7500403 true true 116 41 127
Circle -7500403 true true 45 90 120
Circle -7500403 true true 104 74 152

triangle
false
0
Polygon -7500403 true true 150 30 15 255 285 255

triangle 2
false
0
Polygon -7500403 true true 150 30 15 255 285 255
Polygon -16777216 true false 151 99 225 223 75 224

truck
false
0
Rectangle -7500403 true true 4 45 195 187
Polygon -7500403 true true 296 193 296 150 259 134 244 104 208 104 207 194
Rectangle -1 true false 195 60 195 105
Polygon -16777216 true false 238 112 252 141 219 141 218 112
Circle -16777216 true false 234 174 42
Rectangle -7500403 true true 181 185 214 194
Circle -16777216 true false 144 174 42
Circle -16777216 true false 24 174 42
Circle -7500403 false true 24 174 42
Circle -7500403 false true 144 174 42
Circle -7500403 false true 234 174 42

turtle
true
0
Polygon -10899396 true false 215 204 240 233 246 254 228 266 215 252 193 210
Polygon -10899396 true false 195 90 225 75 245 75 260 89 269 108 261 124 240 105 225 105 210 105
Polygon -10899396 true false 105 90 75 75 55 75 40 89 31 108 39 124 60 105 75 105 90 105
Polygon -10899396 true false 132 85 134 64 107 51 108 17 150 2 192 18 192 52 169 65 172 87
Polygon -10899396 true false 85 204 60 233 54 254 72 266 85 252 107 210
Polygon -7500403 true true 119 75 179 75 209 101 224 135 220 225 175 261 128 261 81 224 74 135 88 99

wheel
false
0
Circle -7500403 true true 3 3 294
Circle -16777216 true false 30 30 240
Line -7500403 true 150 285 150 15
Line -7500403 true 15 150 285 150
Circle -7500403 true true 120 120 60
Line -7500403 true 216 40 79 269
Line -7500403 true 40 84 269 221
Line -7500403 true 40 216 269 79
Line -7500403 true 84 40 221 269

x
false
0
Polygon -7500403 true true 270 75 225 30 30 225 75 270
Polygon -7500403 true true 30 75 75 30 270 225 225 270
@#$#@#$#@
NetLogo 6.2.0
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
default
0
-0.2 0 0 1
0 1 1 0
0.2 0 0 1
link direction
true
0
Line -7500403 true 150 150 90 180
Line -7500403 true 150 150 210 180
@#$#@#$#@

@#$#@#$#@
