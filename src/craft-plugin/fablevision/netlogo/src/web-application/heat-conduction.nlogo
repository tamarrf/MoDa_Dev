globals [
  ;; the size of the plate on which heat is diffusing
  plate-size
  ;; Used for scaling the color of the patches
  ;; the minimum temperature at setup time
  min-temp
  ;; the maximum temperature at setup time
  max-temp
  ;; the value for each material
  ;alpha
  room-temp
 ; bottom-temp
  tick-delta                                  ;; how much we advance the tick counter this time through
  max-tick-delta                              ;; the largest tick-delta is allowed to be
  tick-counter
  bottomCor
  turtle-color
  termometer_1_X
  termometer_1_Y 
  termometer_2_X
  termometer_2_Y 
  roomTemp
  bottomTemperature
  linked
  ;;old_unit
  mouse-up?
  collision-check
  recent-particles														;; to be used to regulate for each particles
  initial-temperature
  particles-on-patch
  random-wiggle 
  temp1
  temp2
]

breed [ particles particle ]
breed [ electrons electron ]
breed [ termometers termometer ]

;;old_unit
breed [ dots dot ]

;; properties owned by turtles
turtles-own [
  ;; current temperature of the turtle
  temperature
  ;; old tempearture
  old-temperature
  ;; remembers the old position
  vibrate-energy
  turtle-moved
  wiggle-displacement
 ; ycorr
 ; xcorr
]


patches-own [
  smokes-on-patch
  temperature-patch
  heatsource?
  original-color
]


particles-own [
  speed mass energy arrangement      ;; particle info
  particle-type							 ;; new one
  last-collision
  first-time
  collision-enemies
  collision-candidate
  collision-where
  collision-flag
  collision-hatching
  initial-vel-x
  initial-vel-y
  move-factor
 ; particle-moved
]

electrons-own [
 ; electron-moved
  last-collision
  first-time
  collision-enemies
  collision-candidate
  collision-where
  collision-flag
  collision-hatching
  initial-vel-x
  initial-vel-y
  move-factor
particle-type
]

;;old_unit
dots-own [
  empty
]

to create-termometer


  let size-screen 0.8

  create-termometers 1 [
   set color blue
   set size 2
   set shape "square"
   setxy (termometer_1_X + 0) (termometer_1_Y + 0)
  ]

  create-termometers 1 [
   set color white
   set size size-screen
   set shape "square"
   setxy (termometer_1_X - ((size-screen - 0.2) / 2 )) (termometer_1_Y + 0.2)
   ;set label "Olá"
   set label-color black
    output-print (word("Ola tudo bom?"))
  ]

 create-termometers 1 [
   set color white
   set size size-screen
   set shape "square"
   setxy (termometer_1_X + ((size-screen - 0.2) / 2 )) (termometer_1_Y + 0.2)
  ]
   
   create-termometers 1 [
   set color white
   set size 0.01
   set shape "triangle"
   set label-color black
   set label word (precision temp1 0) "°C"
   setxy (termometer_1_X + 0.22 + ((size-screen - 0.2) / 2 )) (termometer_1_Y + 0.02)
  ]

    create-termometers 1 [
   set color green
   set size 2
   set shape "square"
   setxy (termometer_2_X + 0) (termometer_2_Y + 0)
  ]

  create-termometers 1 [
   set color white
   set size size-screen
   set shape "square"
   setxy (termometer_2_X - ((size-screen - 0.2) / 2 )) (termometer_2_Y + 0.2)
   ;set label "Olá"
   set label-color black
    output-print (word("Ola tudo bom?"))
  ]

 create-termometers 1 [
   set color white
   set size size-screen
   set shape "square"
   setxy (termometer_2_X + ((size-screen - 0.2) / 2 )) (termometer_2_Y + 0.2)
  ]
   
   create-termometers 1 [
   set color white
   set size 0.01
   set shape "triangle"
   if ((count particles > 0)) [
    set temp2 (mean [temperature] of particles-on patches with [ pycor >= (termometer_2_Y - 1) and pycor <= (termometer_2_Y + 1) and pxcor >= (termometer_2_X - 1) and pxcor <= (termometer_2_X + 1)])
  ]
   set label-color black
   set label word (precision temp2 0) "°C"
   setxy (termometer_2_X + 0.22 + ((size-screen - 0.2) / 2 )) (termometer_2_Y + 0.02)
  ]

end

to setup
  ;; clear previous experiments
  ca
  set bottomCor -6
  set termometer_1_X -3
  set termometer_1_Y -3
  set termometer_2_X 3
  set termometer_2_Y 3
  set bottomTemperature bottom-temp
 
  ;;resizes world min-pxcor max-pxcor min py-cor max-pycor
 ; resize-world -6 6 -7 6

  ;;set patch size
 ; set-patch-size 30

  ;;reset tick counter for visualizing vibrational energy
  set tick-counter 0

  ;;Cheat to make all the risized world to show
 ; create-turtles 1 [
 ;   setxy min-pxcor min-pycor
 ;   setxy min-pxcor max-pycor
 ;   setxy max-pxcor min-pycor
 ;   setxy max-pxcor max-pycor
 ;   die 
 ; ]

  ;;from nettango sliders
  set room-temp 20
  set roomTemp room-temp
 ; set bottom-temp 72
  
    ;; use 0.6 to make a nice sized plate
  set plate-size max-pxcor
  ;; update alpha value according to picked material
  ;  update-alpha
  ;; set up the plate
  ask patches [
    ;; if the patch is on the plate, then change background
    set pcolor black
   if (pycor = bottomCor) [ set pcolor scale-color red rescale bottomTemperature 19.9 14.4 ]

   
 ;   if (pycor = max-pycor) or (pycor = min-pycor) or (pxcor = max-pxcor) or (pxcor = min-pxcor)[
 ;     set pcolor white
 ;   ]

   
  ]

   ;; create heat souce
 ; ask patch 5 -17 [set plabel "heat source"]
  ;; find min temperature among patches
  set min-temp 0
  ;; find max temperature among patches
  set max-temp 100

  ask particles [color-particle]

  ;; draw the legend
  ;draw-legend
  ;; start time
  set tick-delta 0.02
  set max-tick-delta 1

  ;reset-ticks is on blocks .js file

  ;;old_unit
  ask dots [ht]
  ask links [hide-link]
  set mouse-up? true
  set collision-check 0

  create-termometer
  set initial-temperature 10
end

;; rescale the temperature to fit the color scheme
to-report rescale [value]
  let valor 0
  if (bottom-temp = room-temp)[set valor 1]
  report ((value - room-temp) / (bottomTemperature - room-temp + valor)) * (17 - 14.5) + 14.5
end

to-report rescale-legend [value]
  report ((value - 20) / ((floor (bottomTemperature / 10) * 10) - 20)) * (17 - 14.5) + 14.5
end


to color-agent
  if particle-type != "electrons"  
  [
    set color scale-color red rescale temperature 19.9 14.4
  ]
  
  
end

;to color-agent
; if breed = particles
;  [
;    set color scale-color turtle-color rescale temperature 19.9 14.4
;  ]
  
;end

;; color particles based on temperature
to color-particle
  set color scale-color red rescale temperature 19.9 14.4
end

;; color particles based on temperature
to color-electron
 ; set color scale-color yellow rescale temperature 19.9 14.4
 ;set color yellow
end


;; Draws the Color Scale Legend, from room-temperature (min) to bottom-temperature (max)
to draw-legend
  let x (1 + min-pxcor)
  let rep int (bottom-temp / 10 + 1) - 2
  repeat 3 [
    let y 0
    repeat rep [
      ask patch (x + 4) (y * 2 - 11) [ set pcolor (scale-color red rescale-legend (y * 10 + 20) 19.9 14.4) ]
      ask patch (x + 4) (y * 2 - 10) [ set pcolor (scale-color red rescale-legend (y * 10 + 20) 19.9 14.4) ]
      set y y + 1
    ]
    set x x + 1
  ]
  set x (1 + min-pxcor)
  repeat 3 [
    let y 0
    repeat rep + 1[
      if (x = (3 + min-pxcor)) [
        ask patch x (y * 2 - 12) [
          set plabel (y * 10 + 20)
        ]
      ]
      set y y + 1
    ]
    set x x + 1
  ]
end

;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; Runtime Procedures ;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Runs the simulation through a loop
to go
  ; increment time by 1 unit
  plotxy ticks ink-spread
  tick
  set tick-counter tick-counter + 1
  if tick-counter = 3 [set tick-counter 0]
  create-termometer
end

to-report ink-spread

  if ((count particles > 0)) [
    set temp1 (mean [temperature] of particles-on patches with [ pycor >= (termometer_1_Y - 1) and pycor <= (termometer_1_Y + 1) and pxcor >= (termometer_1_X - 1) and pxcor <= (termometer_1_X + 1)])
  ]
  report temp1
end


;; what happens when there are multiple electrons on the patch??

;; calculate a new temperature
to-report new-temperature
  ;; agents in the border/corner will have less neighbors
    let nei count particles-on neighbors
  ;; diffuse the heat of a particle with its neighbors
  let transfer old-temperature + ( heat-diffusivity * ( sum [ old-temperature] of ( particles-on neighbors with [pcolor != white]) ) ) - (nei * heat-diffusivity * old-temperature)
  let curr-electrons (electrons-on patch-here)
  let electron-count count curr-electrons
  if electron-count != 0 [
    set transfer transfer + (heat-diffusivity-electron * ( sum [old-temperature] of curr-electrons)) - (electron-count * heat-diffusivity-electron * old-temperature)
  ]
  report transfer
end

to-report new-electron-temperature
  let curr-particle (one-of particles-on patch-here)
  let transfer old-temperature + (heat-diffusivity-electron * [old-temperature] of curr-particle) - ( heat-diffusivity-electron * old-temperature)
  report transfer
end

;; report the heat diffusivity constant that we use for the calculations
to-report heat-diffusivity
  ;; a few notes on the constants used here:
  ;; --we use .25 as a time step that causes the heat to diffuse at a reasonable pace
  ;; --we use alpha + .3 instead of just alpha here since alpha would be too
  ;; small to view any changes between some of the preset materials
  ;; --these constants are necessary since this model uses an Euler approximation to
  ;; calculate the temperature.  the approximation is only valid within a certain range
  ;; of time-steps and this range changes depending upon the value of alpha.
  ;;report .25 * e ^ (-1 / (alpha + .3));
  ;old particle-diffusivity-const
  report 0.01
end

to-report heat-diffusivity-electron
  ;;report .25 * e ^ (-1 / (alpha + .3));
  ;old electron-diffusivity-const
  report 0.01
end

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; PARTICLES PROCEDURES ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;to visualize-vibrational-energy

 ; set vibrate-energy (vibrate-energy + temperature / 5)
 ; if vibrate-energy >= temperature [set vibrate-energy temperature]
 ; if vibrate-energy <= (- temperature) [set vibrate-energy (- temperature)]

  ;forward 1
  ;set heading heading - 180
;   ifelse particle-moved = 0 [
;        set heading random 360
;        forward ((vibrate-energy / 80) * 0.2)
;        set heading heading - 180
;        set electron-moved 1
;        ]

 ;       [
 ;       forward ((vibrate-energy / 80) * 0.2)
 ;       set heading heading - 180
 ;       set electron-moved 0
 ;       ]

;end

;to visualize-vibrational-energy
;  set vibrate-energy (vibrate-energy + temperature / 5)
;  if vibrate-energy >= temperature [set vibrate-energy temperature]
;  if vibrate-energy <= (- temperature) [set vibrate-energy (- temperature)]
;  setxy pxcor +  ((sqrt vibrate-energy) * (1 - random-float 3)) / 100 pycor + ((sqrt vibrate-energy) * (1 - random-float 3)) / 100
;end

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; © 2018 Transformative Learning Technologies Lab, Stanford Graduate School of Education
;;
;; based on the original models "Heat Diffusion" © 1998 Uri Wilensky (heat conduction) and "Connected Chemistry Rusting Reaction" © 2007 Uri Wilensky
;;
;; developer: DigitalDust Consulting Sagl - info@digitaldustconsulting.com

;old_unit
;every line of code below belongs to old unit

to bounce-wall
  set collision-check 1
  if abs [pxcor] of patch-ahead 1 >= max-pxcor - 4
    [ set heading (- heading) ]
  if abs [pycor] of patch-ahead 1 >= max-pycor - 4
    [ set heading (180 - heading) ]
end

to particle-forward
  let xcorr (xcor + initial-vel-x * tick-delta)
  let ycorr (ycor + initial-vel-y * tick-delta)
  setxy xcorr ycorr
  if abs xcorr >= max-pxcor or abs ycorr >= max-pycor and particle-type = "smoke"[
    die ]
end

to move [direction-x direction-y magnitude]
  ;; normalize velecoity vector
  let old-magnitude sqrt (direction-x * direction-x + direction-y * direction-y)
  let direction-x-norm direction-x / old-magnitude
  let direction-y-norm direction-y / old-magnitude

  let accel-x (direction-x-norm * magnitude * move-factor)
  let accel-y (direction-y-norm * magnitude * move-factor)
  
  ;; update velocity
  let vx (dx * speed) + (accel-x * tick-delta)
  let vy (dy * speed) + (accel-y * tick-delta)
  set speed sqrt ((vy ^ 2) + (vx ^ 2))
  ifelse (vx = 0 and vy = 0) [set heading heading] [set heading atan vx vy]

  ;; update position
  let xcorr (xcor + accel-x * tick-delta)
  let ycorr (ycor + accel-y * tick-delta)
  setxy xcorr ycorr
  if abs xcorr >= max-pxcor or abs ycorr >= max-pycor and particle-type = "smoke"[ die ]

end

to move-particles-away
 ;; move-to patch-here  ;; go to patch center
  let p min-one-of neighbors [particles-on-patch]
  ifelse ([particles-on-patch] of p < particles-on-patch) [
    face p
  ]
  [
    set heading random (360)
    
  ]
  fd 0.5
end

to check-for-collision
  set collision-check 1
  if (count collision-enemies > 0) and (collision-candidate != nobody) and (speed > 0 or [speed] of collision-candidate > 0)
    [
      collide-with collision-candidate
      set last-collision collision-candidate
      ask collision-candidate [ set last-collision myself ]
  	]	
end

to collide-with [ other-particle ] ;; particle procedure
  ;;; PHASE 1: initial setup

  let initial-dx-1 dx
  let initial-dy-1 dy
  let initial-speed-1 speed

  ;; for convenience, grab some quantities from other-particle
  let mass2 [mass] of other-particle
  let speed2 [speed] of other-particle
  let heading2 [heading] of other-particle
  let initial-dx-2 [dx] of other-particle
  let initial-dy-2 [dy] of other-particle
  let initial-speed-2 [speed] of other-particle

  ;; since particles are modeled as zero-size points, theta isn't meaningfully
  ;; defined. we can assign it randomly without affecting the model's outcome.
  let theta (random-float 360)



  ;;; PHASE 2: convert velocities to theta-based vector representation
  ;; now convert my velocity from speed/heading representation to components
  ;; along theta and perpendicular to theta
  let v1t (speed * cos (theta - heading))
  let v1l (speed * sin (theta - heading))
  ;; do the same for other-particle
  let v2t (speed2 * cos (theta - heading2))
  let v2l (speed2 * sin (theta - heading2))
  ;;; PHASE 3: manipulate vectors to implement collision
  ;; compute the velocity of the system's center of mass along theta
  let vcm (((mass * v1t) + (mass2 * v2t)) / (mass + mass2) )
  ;; now compute the new velocity for each particle along direction theta.
  ;; velocity perpendicular to theta is unaffected by a collision along theta,
  ;; so the next two lines actually implement the collision itself, in the
  ;; sense that the effects of the collision are exactly the following changes
  ;; in particle velocity.
  set v1t (2 * vcm - v1t)
  set v2t (2 * vcm - v2t)

  ;;; PHASE 4: convert back to normal speed/heading
  ;; now convert my velocity vector into my new speed and heading
  set speed sqrt ((v1t ^ 2) + (v1l ^ 2))
  set energy (0.5 * mass * speed * speed)
  ;; if the magnitude of the velocity vector is 0, atan is undefined. but
  ;; speed will be 0, so heading is irrelevant anyway. therefore, in that
  ;; case we'll just leave it unmodified.
  if v1l != 0 or v1t != 0
    [ set heading (theta - (atan v1l v1t)) ]

  ;; and do the same for other-particle
  ask other-particle [
    set speed sqrt ((v2t ^ 2) + (v2l ^ 2))
    set energy (0.5 * mass * (speed ^ 2))
    if v2l != 0 or v2t != 0
      [ set heading (theta - (atan v2l v2t)) ]
  ]

  ;; PHASE 5: Find acceleration generated by collision for first particle
  ;; and ipdate position with that acceleration
  let x-accel dx * speed - initial-dx-1 * initial-speed-1
  let y-accel dy * speed - initial-dy-1 * initial-speed-1

  let xcorr (xcor + x-accel * tick-delta)
  let ycorr (ycor + y-accel * tick-delta)
  setxy xcorr ycorr

  ;; PHASE 6: Repeat for other particle
  ask other-particle [
    let x-accel-2 dx * speed - initial-dx-2 * initial-speed-2
    let y-accel-2 dy * speed - initial-dy-2 * initial-speed-2

    let xcorr-2 (xcor + x-accel-2 * tick-delta)
    let ycorr-2 (ycor + y-accel-2 * tick-delta)
    setxy xcorr-2 ycorr-2
  ]

end

to drop-with-mouse [number]
  let boundaries 20
  if number < 100 [set boundaries max-pxcor * 0.05]
  if number > 250 [set boundaries max-pxcor * 0.1]

  if (abs mouse-xcor >= max-pxcor - boundaries) or abs mouse-ycor >= max-pycor - boundaries [
    die
  ]

  let mouse-x mouse-xcor
  let mouse-y mouse-ycor

  let randxy 2 + random number / 50
  let rand-radius random 360
  set mouse-x (mouse-x + 0.5 * randxy * sin rand-radius)
  set mouse-y (mouse-y + randxy * cos rand-radius)

  while [count particles with [ pxcor = mouse-x and pycor = mouse-y] > 0][
    set mouse-x mouse-x + random-float 1
    set mouse-y mouse-y + random-float 1
  ]

  setxy mouse-x mouse-y

  let disperse-factor 80
;  if initial-temperature < 15 [set disperse-factor 120]
  let rand-heading ( 2 * initial-temperature + disperse-factor)
  ifelse collision-check = 1 [
    set heading  180 -  rand-heading / 2 + random rand-heading
  ]
  [
    set heading 180 -  rand-heading / 20 + random rand-heading / 10
  ]
end

; --- START BLOCKLY GENERATED NETLOGO ---

;BLOCKLY CODE GOES HERE

; --- END BLOCKLY GENERATED NETLOGO ---

@#$#@#$#@
GRAPHICS-WINDOW
10
210
10
210
-1
-1
20
1
15
1
1
1
0
0
0
1
-5
5
-6
5
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

SLIDER
300
65
449
98
bottom-temp
bottom-temp
20
80
70
1
1
°C
HORIZONTAL

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
temperatura
temperatura
1
1
-1000

MONITOR
640
65
753
110
ink spread (%)
ink-spread
0
1
11

PLOT
637
121
832
370
Ink spread
Time (tick-delta)
%
0
100
0
100
true
false
"" ""
PENS
"default" 1 0 -16777216 true "" "plot ink-spread"
@#$#@#$#@
## WHAT IS IT?

(a general understanding of what the model is trying to show or explain)

## HOW IT WORKS

(what rules the agents use to create the overall behavior of the model)

## HOW TO USE IT

(how to use the model, including a description of each of the items in the Interface tab)

## THINGS TO NOTICE

(suggested things for the user to notice while running the model)

## THINGS TO TRY

(suggested things for the user to try to do (move sliders, switches, etc.) with the model)

## EXTENDING THE MODEL

(suggested things to add or change in the Code tab to make the model more complicated, detailed, accurate, etc.)

## NETLOGO FEATURES

(interesting or unusual features of NetLogo that the model uses, particularly in the Code tab; or where workarounds were needed for missing features)

## RELATED MODELS

(models in the NetLogo Models Library and elsewhere which are of related interest)

## CREDITS AND REFERENCES

(a reference to the model's URL on the web if it has one, as well as any other necessary credits, citations, and links)
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

circle 3
false
0
Circle -7500403 false true 0 0 300

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

drop ink
false
0
Polygon -7500403 true true 150 300 300 150 195 150 195 7 105 7 105 150 0 150

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

none
true
0

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

sheep
false
15
Circle -1 true true 203 65 88
Circle -1 true true 70 65 162
Circle -1 true true 150 105 120
Polygon -7500403 true false 218 120 240 165 255 165 278 120
Circle -7500403 true false 214 72 67
Rectangle -1 true true 164 223 179 298
Polygon -1 true true 45 285 30 285 30 240 15 195 45 210
Circle -1 true true 3 83 150
Rectangle -1 true true 65 221 80 296
Polygon -1 true true 195 285 210 285 210 240 240 210 195 210
Polygon -7500403 true false 276 85 285 105 302 99 294 83
Polygon -7500403 true false 219 85 210 105 193 99 201 83

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

wolf
false
0
Polygon -16777216 true false 253 133 245 131 245 133
Polygon -7500403 true true 2 194 13 197 30 191 38 193 38 205 20 226 20 257 27 265 38 266 40 260 31 253 31 230 60 206 68 198 75 209 66 228 65 243 82 261 84 268 100 267 103 261 77 239 79 231 100 207 98 196 119 201 143 202 160 195 166 210 172 213 173 238 167 251 160 248 154 265 169 264 178 247 186 240 198 260 200 271 217 271 219 262 207 258 195 230 192 198 210 184 227 164 242 144 259 145 284 151 277 141 293 140 299 134 297 127 273 119 270 105
Polygon -7500403 true true -1 195 14 180 36 166 40 153 53 140 82 131 134 133 159 126 188 115 227 108 236 102 238 98 268 86 269 92 281 87 269 103 269 113

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
