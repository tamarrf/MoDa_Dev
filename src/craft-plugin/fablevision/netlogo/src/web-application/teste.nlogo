globals [
  tick-delta                                  ;; how much we advance the tick counter this time through
  max-tick-delta                              ;; the largest tick-delta is allowed to be
  mouse-up?
  collision-check
  recent-particles														;; to be used to regulate for each particles
  initial-temperature
  particles-on-patch
  random-wiggle
  grid-showing?
  o2-count
  light-intensity
]

breed [ chloroplasts chloroplast ]
breed [ particles particle ]

breed [ dots dot ]

chloroplasts-own [
  speed mass energy          ;; person info
  photo-candidate-H2O
  photo-candidate-CO2
  particle-type
  ismoving?
]

particles-own [
  speed mass energy          ;; particle info
  particle-type							 ;; new one
  photo-candidate-H2O
  photo-candidate-CO2
  photo-candidate-ENERGY
  ismoving?
  chloroplasts-candidate
  kill
  ready?
  sugar-count
  sugar-count-old
  last-collision
  first-time
  collision-enemies
  collision-candidate
  collision-where
  collision-flag
  collision-hatching
]

dots-own [
  empty
]

to setup
  ca
  set light-intensity 120
  set o2-count 0
  set-default-shape chloroplasts "circle"
  ;set-default-shape particles "circle"
  set-default-shape dots "dot"
  
  ask patches [set pcolor white]

 ; ask patches with [remainder (pxcor) 20 = 0 and remainder (pycor) 20 = 0 ][
 ;   sprout-dots 1 [
 ;     set color white
 ;     set size 1
 ;   ]
 ; ]
  ;ask dots with  [abs xcor < max-pxcor - 5 and abs ycor < max-pycor - 5][
  ;  create-links-to dots in-radius 20]
  ask dots [ht]
  ;ask links [hide-link]
  set mouse-up? true
  set collision-check 0
  set tick-delta 0.1
  set max-tick-delta 1
  set initial-temperature temperature
  set grid-showing? not grid?
  ifelse grid? [hide-grid] [hide-grid]

  ;create chloroplasts
  create-particles 1 [
     set particle-type "chloroplasts"
     set size 60
     set ismoving? true
     set shape "circle"
     set color [0 125 0 75]
     set mass 3 
     set photo-candidate-H2O nobody
     set photo-candidate-CO2 nobody 
     set photo-candidate-ENERGY nobody
     set heading random-float 360
     setxy -50 -60
     set first-time 1
     set last-collision nobody
     set collision-flag 0
     set mass 3
     set speed 10
     set collision-hatching 0
     set sugar-count-old 0
     set label sugar-count
     set label-color black
  ]

   ;create chloroplasts
  create-particles 1 [
     set particle-type "chloroplasts"
     set size 60
     set ismoving? true
     set shape "circle"
     set color [0 125 0 75]
     set mass 3 
     set photo-candidate-H2O nobody
     set photo-candidate-CO2 nobody
     set photo-candidate-ENERGY nobody 
     set heading random-float 360
     setxy 40 -5
     set first-time 1
     set last-collision nobody
     set collision-flag 0
     set mass 3
     set speed 10
     set collision-hatching 0
     set sugar-count 0
     set sugar-count-old 0
     set label sugar-count
     set label-color black
  ]

   ;create chloroplasts
  create-particles 1 [
     set particle-type "chloroplasts"
     set size 60
     set ismoving? true
     set shape "circle"
     set color [0 125 0 75]
     set mass 3 
     set photo-candidate-H2O nobody
     set photo-candidate-CO2 nobody
     set photo-candidate-ENERGY nobody 
     set heading random-float 360
     setxy 10 60
     set first-time 1
     set last-collision nobody
     set collision-flag 0
     set mass 3
     set speed 10
     set collision-hatching 0
     set sugar-count 0
     set sugar-count-old 0
     set label sugar-count
     set label-color black
  ]

  ;;aqui

 
end


to turtle-forward

if ismoving? = true [
  let xcorr (xcor + dx * speed * tick-delta)
  let gravity 0
  let ycorr (ycor + dy * speed * tick-delta)
  setxy xcorr ycorr
  ]
end


to show-grid
  if not grid-showing? [
    ask dots [st]
    ;; setup grid
    ask patches with [remainder (pxcor) 20 = 0 or remainder (pycor) 20 = 0 ][
      set pcolor white
    ]
    set grid-showing? true
  ]
end

to hide-grid
  if grid-showing? [
    ask dots [ht]
    ask patches with [remainder (pxcor) 20 = 0 or remainder (pycor) 20 = 0 ][
      set pcolor white
    ]
    set grid-showing? false
  ]
end

to color-patches
  ask patches [
    let light-intensity-value temperature  ; Assuming you have a variable 'light-intensity'
    let color-value 0

    if light-intensity-value >= 0 and light-intensity-value <= 30 [
      set color-value 8 + (light-intensity-value - 0) / 30 * (9.9 - 8)
    ]
    if light-intensity-value > 30 and light-intensity-value <= 60 [
      set color-value 49.9 - (light-intensity-value - 30) / 30 * (49.9 - 48)
    ]

    set pcolor color-value
  ]
end




to produce-glucose
        
        

  ;  if sugar-count > 5 [
      ;set sugar-count 0
        
        hatch-particles 1 [
          set particle-type "glucose"
          set size 80
          set color [0 125 0 255]
          set shape "glucose_6"
          set ismoving? true
          set mass 3 
          set photo-candidate-H2O nobody
          set photo-candidate-CO2 nobody
          set chloroplasts-candidate nobody 
          set heading random-float 360
          set first-time 1
          set last-collision nobody
          set collision-flag 0
          set mass 3
          set speed 5
          set collision-hatching 0
          set label ""
        ]
        ask particles with [chloroplasts-candidate = myself] [set kill 1]
  ;    ] 
end
to produce-o2

  ;if (photo-candidate-CO2 != nobody) [
  ;  ask photo-candidate-CO2 [
  ;    if ready? = true [
       
       
       hatch-particles 1 [
          set particle-type "o2"
          set size 16
          set ismoving? true
          set shape "o2"
          set mass 3 
          set color [1 2 3 255]
          set photo-candidate-H2O nobody
          set photo-candidate-CO2 nobody
          set chloroplasts-candidate nobody 
          set heading random-float 360
          set first-time 1
          set last-collision nobody
          set collision-flag 0
          set mass 3
          set speed 5
          set collision-hatching 0
          set kill 0
          set label ""
           set o2-count o2-count + 1
       ]
       
       ;set kill 1

      ;]
    ;]
  ;]
  
 ; if (photo-candidate-H2O != nobody) [
 ;   ask photo-candidate-H2O [
 ;    if ready? = true [
        
  ;        set kill 1
  ;      ask chloroplasts-candidate [ 

         hatch-particles 1 [
          set ready? false
          set shape "glucose_1"
          set particle-type "glucose-complex"
          set size 60
          set ismoving? false
          set mass 3 
          set color [1 2 3 255]
          set photo-candidate-H2O nobody
          set photo-candidate-CO2 nobody
          set chloroplasts-candidate myself 
          set heading random-float 360
          set first-time 1
          set last-collision nobody
          set collision-flag 0
          set mass 3
          set speed 5
          set collision-hatching 0
          set label ""
      ]
  ;      ]
  ;    ]
  ;    ]
  ;  ]
  
  
  set photo-candidate-CO2 nobody
  set photo-candidate-H2O nobody
   ask particles with [chloroplasts-candidate = myself and particle-type = "co2"] [set kill 1]
   ask particles with [chloroplasts-candidate = myself and particle-type = "h2o"] [set kill 1]

end

to produce-glucose-complex

           hatch-particles 1 [
          set ready? false
          set shape "glucose_1"
          set particle-type "glucose-complex"
          set size 60
          set ismoving? false
          set mass 3 
          set color [1 2 3 255]
          set photo-candidate-H2O nobody
          set photo-candidate-CO2 nobody
          set chloroplasts-candidate myself 
          set heading random-float 360
          set first-time 1
          set last-collision nobody
          set collision-flag 0
          set mass 3
          set speed 5
          set collision-hatching 0
          set label ""
    
       ]

end

to break-apart-co2
   
    ; if to prevent code to ask an empy agentset
    if (photo-candidate-CO2 != nobody) and (photo-candidate-ENERGY != nobody) [
      ask photo-candidate-CO2 [
        set ismoving? false
        set chloroplasts-candidate myself
        set heading towards chloroplasts-candidate
      

        if distance chloroplasts-candidate >= 10 [
          forward 0.8
        ]
          ;if shape = "co2_part5" [ set shape "co2_part6" ]
          ;if shape = "co2_part4" [ set shape "co2_part5" ]
          ;if shape = "co2_part3" [ set shape "co2_part4" ]
          ;if shape = "co2_part2" [ set shape "co2_part3" ]
          ;if shape = "co2_part1" [ set shape "co2_part2" ]
          ;if shape = "co2" [ set shape "co2_part6" ]
        ;set particle-type "o2"
        ;set o2-count o2-count + 1
          set shape "co2_part6"
          set ready? true
        
      ]
  	  ; create animation here
      ask photo-candidate-ENERGY[
           set kill 1
      ]
    ]

  end

  to break-apart-h2o

  
     if (photo-candidate-H2O != nobody) and (photo-candidate-ENERGY != nobody) [
      ask photo-candidate-H2O [
        set ismoving? false
        set chloroplasts-candidate myself
        set heading towards chloroplasts-candidate
        if distance chloroplasts-candidate >= 10 [
          forward 0.8
        ]
          ;if shape = "h2o_part5" [ set shape "h2o_part6" ]
          ;if shape = "h2o_part4" [ set shape "h2o_part5" ]
          ;if shape = "h2o_part3" [ set shape "h2o_part4" ]
          ;if shape = "h2o_part2" [ set shape "h2o_part3" ]
          ;if shape = "h2o_part1" [ set shape "h2o_part2" ]
          ;if shape = "h2o" [ set shape "h2o_part1" ]
        ;if distance chloroplasts-candidate < 11 and shape = "h2o_part6"[
          set ready? true
          set shape "h2o_part6"
        ;]
      
      ]
       ask photo-candidate-ENERGY[
        set kill 1
      ]
    ]
end

to break-apart

 ; Beginning of take apart ------------------------------------------------------------

    ; Selects a new co2 candidate that is touching chloropasts
   
    ; if to prevent code to ask an empy agentset
    if (photo-candidate-CO2 != nobody) and (photo-candidate-ENERGY != nobody) [
      ask photo-candidate-CO2 [
        set ismoving? false
        set chloroplasts-candidate myself
        set heading towards chloroplasts-candidate
      

        if distance chloroplasts-candidate >= 10 [
          forward 0.8
        ]
          ;if shape = "co2_part5" [ set shape "co2_part6" ]
          ;if shape = "co2_part4" [ set shape "co2_part5" ]
          ;if shape = "co2_part3" [ set shape "co2_part4" ]
          ;if shape = "co2_part2" [ set shape "co2_part3" ]
          ;if shape = "co2_part1" [ set shape "co2_part2" ]
          ;if shape = "co2" [ set shape "co2_part6" ]
        ;set particle-type "o2"
        ;set o2-count o2-count + 1
          set shape "co2_part6"
          set ready? true
        
      ]
  	  ; create animation here
      ask photo-candidate-ENERGY[
           set kill 1
      ]
    ]
     if (photo-candidate-H2O != nobody) and (photo-candidate-ENERGY != nobody) [
      ask photo-candidate-H2O [
        set ismoving? false
        set chloroplasts-candidate myself
        set heading towards chloroplasts-candidate
        if distance chloroplasts-candidate >= 10 [
          forward 0.8
        ]
          ;if shape = "h2o_part5" [ set shape "h2o_part6" ]
          ;if shape = "h2o_part4" [ set shape "h2o_part5" ]
          ;if shape = "h2o_part3" [ set shape "h2o_part4" ]
          ;if shape = "h2o_part2" [ set shape "h2o_part3" ]
          ;if shape = "h2o_part1" [ set shape "h2o_part2" ]
          ;if shape = "h2o" [ set shape "h2o_part1" ]
        ;if distance chloroplasts-candidate < 11 and shape = "h2o_part6"[
          set ready? true
          set shape "h2o_part6"
        ;]
      
      ]
     ;  ask photo-candidate-ENERGY[
     ;   set kill 1
     ; ]
    ]
end

to go
  plotxy ticks ink-spread
  ;color-patches
  ask particles [
    set collision-where patches in-radius (size / 4)
    set collision-enemies other particles-on collision-where
    if count collision-enemies > 0 ;; modified to be realistic, was = 1
    [
      set collision-candidate one-of collision-enemies with [myself != last-collision]; and who < [who] of myself and ]
    ]
	  if collision-check = 1 [
      if xcor > (max-pxcor - 2) [set xcor max-pxcor - 10]
      if xcor < (min-pxcor + 2) [set xcor min-pxcor + 10]
      if ycor > (max-pycor - 2) [set ycor max-pycor - 10]
      if ycor < (min-pycor + 2) [set ycor min-pycor + 10]
    ]
  ]

  ask patches [
    set particles-on-patch count (particles-here)
  ]

  ifelse grid? [
    hide-grid
  ]
  [
    hide-grid
  ]



  ask particles with [particle-type = "chloroplasts"] [
     set label sugar-count
    set label-color black
    
    set photo-candidate-ENERGY nobody
    set photo-candidate-CO2 nobody
    set photo-candidate-H2O nobody

     if photo-candidate-CO2 = nobody [
      set photo-candidate-CO2 one-of other particles in-radius ((size / 2) - 1.5) with [ particle-type = "co2"]
    ]
    ; Selects a new H2O candidate that is touching chloropasts
       if photo-candidate-H2O = nobody [
      set photo-candidate-H2O one-of other particles in-radius ((size / 2) - 1.5) with [ particle-type = "h2o"]
    ]
       if photo-candidate-ENERGY = nobody [
      set photo-candidate-ENERGY one-of other particles in-radius ((size / 2) - 1.5) with [ particle-type = "energy"]
    ]
  ]
  

  ask turtles with [particle-type = "energy"][
    ifelse color = 45
    [set color 3]
    [set color 45]

    if (xcor > max-pxcor - 5) [
      set kill 1
    ]
  ]
ask particles with [kill = 1] [die]


;;aqui


end


to bounce-wall
  set collision-check 1
  if abs [pxcor] of patch-ahead 1 >= max-pxcor - 4
    [ set heading (- heading) ]
  if abs [pycor] of patch-ahead 1 >= max-pycor - 4
    [ set heading (180 - heading) ]
end

to particle-forward
  let xcorr (xcor + dx * speed * tick-delta)
  let gravity 0
  ifelse particle-type = "water" [set gravity 0.01 ][set gravity .01 ]
  let ycorr (ycor + dy * speed * tick-delta - gravity * (0.5 * tick-delta * tick-delta))
  setxy xcorr ycorr
  if abs xcorr >= max-pxcor or abs ycorr >= max-pycor [
  die ]
  if speed > 0 [
    factor-gravity
  ]
end


to factor-gravity  ;; turtle procedure to update speed and heading
  let gravity 0
  ifelse particle-type = "water" [set gravity 0.01 ][set gravity .01 ]
  let vx (dx * speed)
  let vy (dy * speed) - (gravity * tick-delta) ;; fixed gravity now is 3.5 was
  set speed sqrt ((vy ^ 2) + (vx ^ 2))
  set heading atan vx vy
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

  ;; for convenience, grab some quantities from other-particle
  let mass2 [mass] of other-particle
  let speed2 [speed] of other-particle
  let heading2 [heading] of other-particle

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
  ;; PHASE 5: final updates
  ;; no recoloring in our case
end

to drop-with-mouse [number]
  let mouse-x mouse-xcor
  let mouse-y mouse-ycor

  let boundaries 20
  if number < 100 [set boundaries max-pxcor * 0.05]
  if number > 250 [set boundaries max-pxcor * 0.1]

  if (abs mouse-xcor >= max-pxcor - boundaries) or abs mouse-ycor >= max-pycor - boundaries [
    set mouse-x boundaries - max-pxcor + 10
    set mouse-y max-pycor - boundaries - 10
  ]

  let randxy 2 + random number / 50
  let rand-radius random 360
  set mouse-x (mouse-x + 0.5 * randxy * sin rand-radius)
  set mouse-y (mouse-y + randxy * cos rand-radius)

  while [count particles with [ pxcor = mouse-x and pycor = mouse-y] > 0][
    set mouse-x mouse-x + random-float 1
    set mouse-y mouse-y + random-float 1
  ]

  setxy mouse-x mouse-y

  let disperse-factor 160
;  if temperature < 15 [set disperse-factor 120]
  let rand-heading ( 2 * temperature + disperse-factor)
  ifelse collision-check = 1 [
    set heading  180 -  rand-heading / 2 + random rand-heading
  ]
  [
    set heading 180 -  rand-heading / 20 + random rand-heading / 10
  ]
end

to-report ink-spread
 
;  report count particles with [particle-type = "o2"]
report o2-count
end

; --- START BLOCKLY GENERATED NETLOGO ---

to blocks-set
  setup
  create-particles 50
  [
    set particle-type "co2"
    set first-time 1
    set last-collision nobody
    set collision-flag 0
    set size 16
    set photo-candidate-CO2 nobody
    set photo-candidate-H2O nobody
    set ismoving? true
    if particle-type = "co2"[
    set shape "co2"
    ]
    if particle-type = "h2o"[
    set shape "h2o"
    ]
    set kill 0
    set color blue
    set mass 3
    set collision-hatching 0
    set speed 10
    setxy (min-pxcor + 5 + random-float (world-width - 10)) min-pycor + 5 + random-float (world-height - 10)
    set random-wiggle 40
    set heading random-float 360
    if mouse-down?
    [
      drop-with-mouse 50
    ]
  ]
  create-particles 50
  [
    set particle-type "h2o"
    set first-time 1
    set last-collision nobody
    set collision-flag 0
    set size 16
    set photo-candidate-CO2 nobody
    set photo-candidate-H2O nobody
    set ismoving? true
    if particle-type = "co2"[
    set shape "co2"
    ]
    if particle-type = "h2o"[
    set shape "h2o"
    ]
    set kill 0
    set color blue
    set mass 3
    set collision-hatching 0
    set speed 10
    setxy (min-pxcor + 5 + random-float (world-width - 10)) min-pycor + 5 + random-float (world-height - 10)
    set random-wiggle 40
    set heading random-float 360
    if mouse-down?
    [
      drop-with-mouse 50
    ]
  ]
  reset-ticks
end

to blocks-go
  go
  if temperature > random 100 [
  create-particles 1 [
  set particle-type "energy"
  set first-time 1
  set last-collision nobody
  set collision-flag 0
  set size 16
  set color 45
  set photo-candidate-CO2 nobody
  set photo-candidate-H2O nobody
  set ismoving? true
  setxy -100 (100 - random 200)
  set shape "ray"
  set heading 90
  set speed 35
  set kill 0
  set color yellow
  set mass 3
  set collision-hatching 0
  ]
  ]
  ask turtles with [particle-type != "chloroplasts"]
  [
    turtle-forward
  ]
  ask turtles with [particle-type = "chloroplasts"]
  [
    if ((photo-candidate-ENERGY != nobody)) and (((photo-candidate-H2O != nobody)) and ((photo-candidate-CO2 != nobody)))
    [
      set collision-flag 0
      break-apart-h2o
      break-apart-co2
      produce-o2
      set sugar-count sugar-count + 1
    ]
    if sugar-count = 6
    [
      set collision-flag 0
      produce-glucose
      set sugar-count 0
    ]
  ]
  tick-advance tick-delta
  display
  ask particles with [particle-type = "chloroplasts"] [
  set sugar-count-old sugar-count
  ]
end


