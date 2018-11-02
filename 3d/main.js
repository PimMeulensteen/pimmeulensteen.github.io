const get_delta_from_element = function (el, event) {
    let mouse_x = event.clientX
    let mouse_y = event.clientY

    let left_x_elem = el.getBoundingClientRect().left
    let right_x_elem = el.getBoundingClientRect().right
    let top_y_elem = el.getBoundingClientRect().top
    let bottom_y_elem = el.getBoundingClientRect().bottom

    let delta_x = 0
    console.log(mouse_x > right_x_elem,mouse_x < left_x_elem)
    if (mouse_x > right_x_elem) {
        delta_x = mouse_x - right_x_elem
    } else if (mouse_x < left_x_elem) {
         delta_x = left_x_elem - mouse_x 
    } 
    let delta_y = 0
    if (mouse_y < bottom_y_elem) {
        delta_y = mouse_y - bottom_y_elem 
    } else if (mouse_y > top_y_elem) {
        delta_y = mouse_y - top_y_elem 
    }
    return [delta_x,delta_y]
}

const elem = document.getElementById('main')
const elem_h1 = document.getElementById('first')

window.addEventListener("mousemove", function (event) {
    delta = get_delta_from_element(elem_h1, event)
    elem.style.transform = "rotate3d(" + delta[1]/1000 + "," + delta[0]/1000 + ",0,40deg)"
})

