globals [
  tick-delta                                  ;; how much we advance the tick counter this time through
  max-tick-delta                              ;; the largest tick-delta is allowed to be
  mouse-up?
  collision-check
  recent-people														;; to be used to regulate for each people
  people-on-patch
  virus-duration
  duration 
  virus-fatality
  infectiouness
  current-sick-people
  new-sick-people
  holder

  ;;old_unit

  recent-particles														;; to be used to regulate for each particles
  initial-temperature
  particles-on-patch
  random-wiggle
  grid-showing?
]

breed [ people person ]

;;old_unit
breed [ particles particle ]
breed [ dots dot ]

people-own [
  speed mass energy          ;; person info
  person-condition							 ;; new one
  last-collision
  first-time
  collision-enemies
  collision-candidate
  collision-where
  collision-flag
  collision-hatching
  sick-time
  infected-chance
  recovered-chance
]

;;old_unit
particles-own [
  speed mass energy          ;; particle info
  particle-type							 ;; new one
  last-collision
  first-time
  collision-enemies
  collision-candidate
  collision-where
  collision-flag
  collision-hatching
]

;;old_unit
dots-own [
  empty
]

to setup
  ca
  
 ; set-default-shape people "person"
 ; set-default-shape dots "dot"
  
  ask patches [set pcolor white]
  ask patches with [abs pxcor > max-pxcor - 0]
    [ set pcolor gray ]
  ask patches with [abs pycor > max-pycor - 0]
    [ set pcolor gray ]

  ;;old_unit --> take out dots
  ask patches with [remainder (pxcor) 20 = 0 and remainder (pycor) 20 = 0 ][
    sprout-dots 1 [
      set color gray
      set size 1
    ]
  ]
  ;set grid-showing? not grid?
  ;ifelse grid? [show-grid] [hide-grid]
  ;;old_unit --> take out dots

  set mouse-up? true
  set collision-check 0
  set tick-delta 0.01
  set max-tick-delta 1
  set initial-temperature temperature
  set holder 0
  set current-sick-people 0
  set duration 3

end





to go
  plotxy ticks ink-spread
  ask people [
    set collision-where patches in-radius (size / 2)
    set collision-enemies other people-on collision-where
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

   ask people with [person-condition = "sick"] [
    set sick-time sick-time + tick-delta
  ]
  
  ;ask people [color-condition]
 ;; if remainder ticks 1 < 0.1 [  ;;  (2 * tick-delta) > 0.01 [
 ;;   set current-sick-people count people with [person-condition = "sick"]
  
  let decimal-tick ticks - (floor ticks)
  if decimal-tick < 0.01 [
    set current-sick-people holder
    set holder 0
  ]


;;old_unit
  ask patches [
    set particles-on-patch count (particles-here)
  ]

ask people[
;  set size leitura-left
;  set color leitura-mid
;  set label leitura-right
;  set label-color black
]

end


to bounce-wall
  set collision-check 1
  if abs [pxcor] of patch-ahead 1 >= max-pxcor - 4
    [ set heading (- heading) ]
  if abs [pycor] of patch-ahead 1 >= max-pycor - 4
    [ set heading (180 - heading) ]
end

to person-forward
  
  let xcorr (xcor + dx * speed * tick-delta)
  
  let ycorr (ycor + dy * speed * tick-delta)
  
  setxy xcorr ycorr
  
  if abs xcorr >= max-pxcor or abs ycorr >= max-pycor [
    die ]
  
end


to move-people-away
 ;; move-to patch-here  ;; go to patch center
  let p min-one-of neighbors [people-on-patch]
  ifelse ([people-on-patch] of p < people-on-patch) [
    face p
  ]
  [
    set heading random (360)
    
  ]
  fd 0.5
end

;;old_unit
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

;;old_unit
to factor-gravity  ;; turtle procedure to update speed and heading
  let gravity 0
  ifelse particle-type = "water" [set gravity 0.01 ][set gravity .01 ]
  let vx (dx * speed)
  let vy (dy * speed) - (gravity * tick-delta) ;; fixed gravity now is 3.5 was
  set speed sqrt ((vy ^ 2) + (vx ^ 2))
  set heading atan vx vy
end

;;old_unit
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
  if (count collision-enemies > 0) and (collision-candidate != nobody)
    [
      collide-with collision-candidate
      set last-collision collision-candidate
      ask collision-candidate [ set last-collision myself ]
  	]	
end

to collide-with [ other-person ] ;; person procedure
  ;;; PHASE 1: initial setup

  ;; for convenience, grab some quantities from other-person
  let mass2 [mass] of other-person
  let speed2 [speed] of other-person
  let heading2 [heading] of other-person

  ;; since people are modeled as zero-size points, theta isn't meaningfully
  ;; defined. we can assign it randomly without affecting the model's outcome.
  let theta (random-float 360)



  ;;; PHASE 2: convert velocities to theta-based vector representation
  ;; now convert my velocity from speed/heading representation to components
  ;; along theta and perpendicular to theta
  let v1t (speed * cos (theta - heading))
  let v1l (speed * sin (theta - heading))
  ;; do the same for other-person
  let v2t (speed2 * cos (theta - heading2))
  let v2l (speed2 * sin (theta - heading2))
  ;;; PHASE 3: manipulate vectors to implement collision
  ;; compute the velocity of the system's center of mass along theta
  let vcm (((mass * v1t) + (mass2 * v2t)) / (mass + mass2) )
  ;; now compute the new velocity for each person along direction theta.
  ;; velocity perpendicular to theta is unaffected by a collision along theta,
  ;; so the next two lines actually implement the collision itself, in the
  ;; sense that the effects of the collision are exactly the following changes
  ;; in person velocity.
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

  ;; and do the same for other-person
  ask other-person [
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
    die
  ]

  let randxy 2 + random number / 50
  let rand-radius random 360
  set mouse-x (mouse-x + 0.5 * randxy * sin rand-radius)
  set mouse-y (mouse-y + randxy * cos rand-radius)

  while [count people with [ pxcor = mouse-x and pycor = mouse-y] > 0][
    set mouse-x mouse-x + random-float 1
    set mouse-y mouse-y + random-float 1
  ]

  setxy mouse-x mouse-y

  ;let disperse-factor 160
  ;if temperature < 15 [set disperse-factor 120]
  ;let rand-heading ( 2 * temperature + disperse-factor)
  ;ifelse collision-check = 1 [
  ;  set heading  180 -  rand-heading / 2 + random rand-heading
  ;]
  ;[
  ;  set heading 180 -  rand-heading / 20 + random rand-heading / 10
  ;]
end

to-report ink-spread
  ask dots [
    ifelse count particles in-radius 20 with [particle-type = "ink"]  > 0 [
      set empty 0
      set color red + 2
    ]
    [
      set empty 1
      set color green + 2
    ]
  ]
  report precision (100 * count dots with [empty = 0] / count dots) 2
end

to-report sick-people-old
  report 100 * (count people with [person-condition = "sick"]) / (count people)
end

to-report sick-people
  ;let difference (new-sick-people - current-sick-people) 
  report current-sick-people 
end

to color-condition
  (ifelse 
    person-condition = "healthy" [
      set color green
    ]
    person-condition = "sick" [
      set color red
    ]
    person-condition = "recovered" [
      set color blue
    ]
    person-condition = "vaccinated" [
      set color green
  	]
  )
end

to recover-or-die
  (ifelse
    virus-fatality = "instantly" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 1000 < 50 
        	[die]
      ]
      [
        set person-condition "recovered"
    	]
      
    ]
    virus-fatality = "mostly" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 1000 < 20 
        	[die]
      ]
      [
        set person-condition "recovered"
    	]
    ]
    virus-fatality = "sometimes" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 1000 < 2 
        	[die]
      ]
      [
        set person-condition "recovered"
    	]

    ]
    virus-fatality = "never" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 100 < 0 
        	[die]
      ]
      [
        set person-condition "recovered"
    	]

  	]
  )
end 

to-report infection-chance
  let infected? false
  (ifelse 
    infectiouness = "high" [
      if random 1000 < 600 [
        set infected? true
      ]
    ]
    infectiouness = "medium" [
      if random 1000 < 40 [
        set infected? true
      ]
    ]
    infectiouness = "low" [
      if random 1000 < 4 [
        set infected? true
      ]
    ]
  )  
  report infected?
end
   
to get-infected
  (ifelse 
    infected-chance = "high" [
      if random 1000 < 700 [
        set person-condition "sick"
        set holder holder + 1
      ]
    ]
    infected-chance = "medium" [
      if random 1000 < 40 [
        set person-condition "sick"
        set holder holder + 1
      ]
    ]
    infected-chance = "low" [
      if random 1000 < 4 [
        set person-condition "sick"
        set holder holder + 1
      ]
    ]
  )  
end

to recover
  (ifelse
    recovered-chance = "very low" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 1000 < 50 
        	[die]
      ]
      [
        set person-condition "recovered"
    	]
      
    ]
    recovered-chance = "low" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 10000 < 40 
        	[die]
      ]
      [
        set person-condition "recovered"
        set sick-time 0
    	]
    ]
    recovered-chance = "medium" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 1000 < 2 
        	[die]
      ]
      [
        set person-condition "recovered"
        set sick-time 0
    	]
    ]
    recovered-chance = "high" [
      ifelse sick-time < duration + (random 100 / 100) [        
      	if random-float 1000 < 1 
        	[die]
      ]
      [
        set person-condition "recovered"
        set sick-time 0
    	]

  	]
  )
end 
    

; --- START BLOCKLY GENERATED NETLOGO ---

to blocks-set
  setup
  create-people 130
  [
    set person-condition "healthy"
    set first-time 1
    color-condition
    set shape "person"
    set sick-time 0
    set last-collision nobody
    set collision-flag 0
    set collision-hatching 0
    set random-wiggle 5
    set speed 50 - random (random-wiggle)
    setxy (min-pxcor + 5 + random-float (world-width - 10)) min-pycor + 5 + random-float (world-height - 10)
    set random-wiggle 40
    set heading random-float 360
    set color green
    set size 8
    set mass 1
    if mouse-down?
    [
      drop-with-mouse 130
    ]
  ]
  reset-ticks
end

to blocks-go
  mouse_click
  go
  ask people with [person-condition = "healthy"]
  [
    if (count collision-enemies > 0) and (collision-candidate != nobody) and ([person-condition] of collision-candidate = "sick")
    [
      set collision-flag 1
      set particle-type "sick"
      set color red
      ;teste 123 testando
    ]
    set collision-flag 0
  ]
  tick-advance tick-delta
  display
end

to mouse_click
  ifelse mouse-up? != false
  [
    if mouse-down?
    [
      set mouse-up? false
      create-people 10
      [
        set person-condition "sick"
        set first-time 1
        color-condition
        set shape "person"
        set sick-time 0
        set last-collision nobody
        set collision-flag 0
        set collision-hatching 0
        set random-wiggle 5
        set speed 50 - random (random-wiggle)
        setxy (min-pxcor + 5 + random-float (world-width - 10)) min-pycor + 5 + random-float (world-height - 10)
        set random-wiggle 40
        set heading random-float 360
        set color red
        set size 8
        set mass 1
        if mouse-down?
        [
          drop-with-mouse 10
        ]
      ]
    ]
  ]
  [
    if not mouse-down?
    [
      set mouse-up? true
    ]
  ]
end


