const images = [
    {
        src: './assets/img/img1.jpg',
        alt: 'Image 1',
        initialXPosition: 100,
        initialYPosition: 100,
        xIncrement: 5,
        yIncrement: 55
    },
    {
        src: './assets/img/img2.jpg',
        alt: 'Image 2',
        initialXPosition: 600,
        initialYPosition: 1050,
        xIncrement: 20,
        yIncrement: 60
    },
    {
        src: './assets/img/img3.jpeg',
        alt: 'Image 3',
        initialXPosition: 1300,
        initialYPosition: 2000,
        xIncrement: 3,
        yIncrement: 62
    },
    {
        src: './assets/img/img4.jpg',
        alt: 'Image 4',
        initialXPosition: 800,
        initialYPosition: 500,
        xIncrement: -8,
        yIncrement: 60
    },
    {
        src: './assets/img/img5.jpg',
        alt: 'Image 5',
        initialXPosition: 900,
        initialYPosition: 300,
        xIncrement: 20,
        yIncrement: 54
    },
    {
        src: './assets/img/img6.jpg',
        alt: 'Image 6',
        initialXPosition: 300,
        initialYPosition: 800,
        xIncrement: 5,
        yIncrement: 50
    }
]

let hoverState = false
const hoverSpeedFactor = 3

const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const splitMatrix = matrix => {
    const sliced = matrix.slice(matrix.indexOf('(') + 1, matrix.indexOf(')'))
    const split = sliced.split(', ')
    return split
}

const resetElement = el => {
    el.style.transition = 'none'
}

const randomize = (min, max) => {
    return Math.floor(Math.random() * max + 1) + min
}

const removeFromMatrix = (matrix, index, el) => {
    const split = splitMatrix(matrix)
    const image = images[index]
    if (+split[5] <= -500) {
        resetElement(el)
        split[5] = vh + 100
        split[4] = image.initialXPosition
    }
    else {
        el.style.transition = 'all 1s';
        if (!hoverState) {
            split[4] = +split[4] - image.xIncrement
            split[5] = +split[5] - image.yIncrement
        }
        else {
            split[4] = +split[4] - (image.xIncrement / hoverSpeedFactor)
            split[5] = +split[5] - (image.yIncrement / hoverSpeedFactor)
        }
    }
    return `matrix(1,0,0,1,${split[4]},${split[5]})`
}

const animate = (el, index) => {
    const style = getComputedStyle(el);
    el.style.transform = removeFromMatrix(style.transform, index, el)
}

$(() => {
    $images = $('.image')
    $preText = $('.alt-text')
    $images.each(function (index) {
        const image = images[index]
        this.src = image.src
        this.alt = image.alt
        this.style.transform = `matrix(1,0,0,1,${image.initialXPosition},${image.initialYPosition})`
        setTimeout(() => {
            setInterval(() => {
                animate(this, index)
            }, 50)
        }, 1000);
    });
    $images.mouseenter(function () {
        hoverState = true
        $preText.text(this.alt)
        this.style.zIndex = 10

    })
    $images.mouseleave(function () {
        hoverState = false
        setTimeout(() => {
            $preText.text('ADOKIYE')
        }, 200);
        this.style.zIndex = 1
    })
})
