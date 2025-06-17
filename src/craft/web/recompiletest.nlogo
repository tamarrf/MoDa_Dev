globals [
  tick-delta                                  ;; how much we advance the tick counter this time through
  max-tick-delta                              ;; the largest tick-delta is allowed to be
  limit
  mouse-up?
  experiments
  particle-color
  collision-check
  candidate
  recent-particles
  where
  enemies
]

breed [ erasers eraser ]
breed [ walls wall ]
breed [ particles particle ]

particles-own [
  speed mass energy          ;; particle info
  particle-type              ;; new one
  last-collision
  first-time
]

walls-own
[
  energy
  valve-1?
  valve-2?
  pressure?
  surface-energy
]

to setup
  ca
  ask patches [set pcolor red]
  ask patches with [abs pxcor >= max-pxcor - 2]
    [ set pcolor gray ]
  ask patches with [abs pycor >= max-pycor - 2]
    [ set pcolor gray ]
  set-default-shape particles "circle"
  set mouse-up? true
  set tick-delta 0.05
  set max-tick-delta 1
end




to bounce-wall
  if abs [pxcor] of patch-ahead 1 >= max-pxcor - 2
    [ set heading (- heading) ]
  if abs [pycor] of patch-ahead 1 >= max-pycor - 2
    [ set heading (180 - heading) ]
end

to particle-forward
  let xcorr (xcor + dx * speed * tick-delta)
  let gravity 0
  ifelse particle-type = "water" [set gravity 0.01 ][set gravity .01 ]
  let ycorr (ycor + dy * speed * tick-delta - gravity * (0.5 * tick-delta * tick-delta))
  setxy xcorr ycorr
end


to factor-gravity  ;; turtle procedure to update speed and heading
  let gravity 0
  ifelse particle-type = "water" [set gravity 0.01 ][set gravity .01 ]
  let vx (dx * speed)
  let vy (dy * speed) - (gravity * tick-delta) ;; fixed gravity now is 3.5 was
  set speed sqrt ((vy ^ 2) + (vx ^ 2))
  set heading atan vx vy
end



to check-for-collision
  set where patches in-radius 3
  set enemies other particles-on where
  if count enemies = 1 ;; modified to be realistic, was = 1
  [
    ;; the following conditions are imposed on collision candidates:
    ;;   1. they must have a lower who number than my own, because collision
    ;;      code is asymmetrical: it must always happen from the point of view
    ;;      of just one particle.
    ;;   2. they must not be the same particle that we last collided with on
    ;;      this patch, so that we have a chance to leave the patch after we've
    ;;      collided with someone.
    set candidate one-of enemies with
    [who < [who] of myself and myself != last-collision]
    ;; we also only collide if one of us has non-zero speed. It's useless
    ;; (and incorrect, actually) for two particles with zero speed to collide.
    if (candidate != nobody) and (speed > 0 or [speed] of candidate > 0)
    [
      collide-with candidate
      set last-collision candidate
      ask candidate [ set last-collision myself ]
    ]
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




; --- NETTANGO BEGIN ---

; This block of code was added by the NetTango builder.  If you modify this code
; and re-import it into the NetTango builder you may lose your changes or need
; to resolve some errors manually.

; If you do not plan to re-import the model into the NetTango builder then you
; can safely edit this code however you want, just like a normal NetLogo model.

; Code for Initial setup
to blocks-go
  mouse_click
  ask particles with [particle-type != "all"]
  [
    ;;checking walls
    bounce-wall
    ;; moving
    particle-forward
    factor-gravity
    check-for-collision
  ]
  if (("high" = "high") and (temperature > 35)) or (("high" = "medium") and (temperature >= 15) and (temperature <= 35)) or (("high" = "low") and (temperature < 15))
  [
    ask particles with [particle-type != "all"]
    [
      set speed 50
    ]
  ]
  if (("medium" = "high") and (temperature > 35)) or (("medium" = "medium") and (temperature >= 15) and (temperature <= 35)) or (("medium" = "low") and (temperature < 15))
  [
    ask particles with [particle-type != "all"]
    [
      set speed 25
    ]
  ]
  if (("low" = "high") and (temperature > 35)) or (("low" = "medium") and (temperature >= 15) and (temperature <= 35)) or (("low" = "low") and (temperature < 15))
  [
    ask particles with [particle-type != "all"]
    [
      set speed 5
    ]
  ]
  tick-advance tick-delta
  ;calculate-tick-delta
end

to mouse_click
  ifelse mouse-up? != false [
    if mouse-down? [
    ]
  ]
  [
    if not mouse-down? [
      set mouse-up? true
    ]
  ]
end

to blocks-set
  setup

  create-particles 75 [
    ;; editable parameters   
    set particle-type "water"
    set speed temperature
    set mass 3
    set energy (.5 * mass * speed * speed)
  
    set first-time 1 ; was 0
    set last-collision nobody
  
    if particle-type = "water" [
    set color cyan
      set size 4    
      setxy (-85 + random-float (170)) -85 + random-float (170)
      set heading random-float 360
    ]
    
      if particle-type = "ink" [
        set color red
      set size 2    
      setxy (-85 + random-float (170)) -85 + random-float (170)
      set heading random-float 360
    ]
    if mouse-down? [
      setxy round mouse-xcor + random 20 round mouse-ycor + random 20
      set heading 180
    ]
  ]
  reset-ticks
end
  
; --- NETTANGO END ---