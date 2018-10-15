//
function moveTo (ele,target) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {

        var x = ele.offsetLeft
        var changeX = 10

        if(Math.abs(target - x) < changeX){

            ele.style.left = target + 'px'
            clearInterval(ele.timer)

            return

        }

        if(x > target){

            changeX = -changeX

        }
        x += changeX

        ele.style.left = x + 'px'

    },20)
}

