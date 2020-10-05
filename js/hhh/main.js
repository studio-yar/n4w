~function() {
  const canvas = document.getElementById('hhh-first-canvas')
  const logo = document.getElementById('hhh-first-logo')
  const section = document.getElementById('hhh-first-section')
  const header = document.getElementById('header')

  const context = canvas.getContext('2d')

  let w, h, points, grid, start, end, frame_id, animated = false, mobile = false, prev_rotation = 'hz'

  setTimeout(() => { logo.classList.add('hhh-first-logo_ready') }, 1300)
  if (/Mobi|Android/i.test(navigator.userAgent)) mobile = true
  resize()
  scroll()
  addEventListener('resize', resize)
  addEventListener('scroll', scroll)

  function scroll(e) {
    if(scrollY <= end && !animated) {
      frame_id = requestAnimationFrame(update)
      animated = true
    } else if(scrollY > end && animated){
      cancelAnimationFrame(frame_id)
      animated = false
    } 
  }

  function resize() {
    let current_rotation
    if(window.matchMedia("(orientation: portrait)").matches) current_rotation = 'portrait'
    else if(window.matchMedia("(orientation: landscape)").matches) current_rotation = 'landscape'

    if(mobile && current_rotation === prev_rotation) return
    else prev_rotation = current_rotation
  
    section.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px'

    w = canvas.width = section.offsetWidth
    h = canvas.height = section.offsetHeight
    points = []
    grid = { cols:[], rows:[] }


    if(window.matchMedia("(max-width: 500px)").matches) {
      createGrid(30, 40)
      resizeLogo(6, 18, 14, 12)
    } else if(window.matchMedia("(max-width: 1024px)").matches) {
      createGrid(26, 26)
      resizeLogo(6, 14, 8, 10)
    } else if(window.matchMedia("(min-width: 1025px)").matches) {
      createGrid(50, 26)
      resizeLogo(16, 18, 8, 10)
    }



    generatePoints()

    start = scrollY + section.getBoundingClientRect().top
    end = start + h  
  }


  function resizeLogo(sx,ex, sy,ey) {
    logo.style.left    = grid.cols[sx] + 'px'
    logo.style.width   = grid.cols[ex] + 'px'
    logo.style.top     = grid.rows[sy]  + 'px'
    logo.style.height  = grid.rows[ey] + 'px'
  }


  function drawCircle(x, y, r, t) {
    let a = Math.abs(Math.sin(Math.PI * t))
    context.save()
    context.beginPath()
    context.fillStyle = '#BD3582'
    context.globalAlpha = a
    context.arc(x + r * Math.cos(Math.PI * t), y + r * Math.sin(Math.PI * t), a*r, 0, Math.PI*2)
    // context.arc(x, y, a*r, 0, Math.PI*2)
    context.fill()
    context.restore()
  }

  function createGrid(cols, rows) {
    const step_x = w / cols
    const step_y = h / rows

    for(let i = 0; i <= cols; i++)
      grid.cols[i] = step_x * i

    for(let i = 0; i <= rows; i++)
      grid.rows[i] = step_y * i
  }

  // for dev

  // function displayGrid() {
  //   context.strokeStyle = 'tomato'
  //   context.lineWidth = 1
  //   for(let i = 1; i < grid.cols.length; i++) {
  //     context.beginPath()
  //     context.moveTo(grid.cols[i], 0)
  //     context.lineTo(grid.cols[i], h)
  //     context.stroke()
  //   }
  //   for(let i = 1; i < grid.rows.length; i++) {
  //     context.beginPath()
  //     context.moveTo(0, grid.rows[i])
  //     context.lineTo(w, grid.rows[i])
  //     context.stroke()
  //   }
  // }

  function generatePoints() {
    for (var i = 0; i < grid.cols.length; i+= 2) {
      for (var j = 0; j < grid.rows.length; j+= 2) {

        const width = grid.cols[i+1] - grid.cols[i]
        const height = grid.rows[j+1] - grid.rows[j]

        const cx = width/2
        const cy = height/2

        points.push({
          x: grid.cols[i]+width,
          y: grid.rows[j]+height,
          r: Math.max(1, Math.min(width, height)/2),
          s: Math.random() + 1
        })
      }
    }
  }

  function update(t) {                          
    context.clearRect(0, 0, w, h) 
    t /= 4000

    points.forEach((point, i) => {
      drawCircle(point.x, point.y, point.r, t*point.s)
    })

    frame_id = requestAnimationFrame(update)
  }
}()

