$(function () {
    $('.dropdown-categories').click(function () {
        $('.header__bottom__left ul').slideToggle();
    });
    $('.dropdown-help').click(function () {
        $('#dropdown-1').slideToggle();
    });
    $('.dropdown-usd').click(function () {
        $('#dropdown-2').slideToggle();
    });
    $('.dropdown-language').click(function () {
        $('#dropdown-3').slideToggle();
    });
    $('.dropdown__shop').click(function () {
        $('#dropdown-4').slideToggle();
    });

    $('.styler-select').styler({

    });

    let $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = 0,
        max = 1000,
        from = 200,
        to = 800;

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        prefix: "$",
        from: from,
        to: to,
        step: 0.01,
        onStart: updateInputs,
        onChange: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });


    $('.accordion__wrapper').on('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'label') {
            if ($(e.target).prev().prop('checked') === false) {
                $(e.target).prev().prop('checked', true)
            }
            else if ($(e.target).prev().prop('checked') === true) {
                $(e.target).prev().prop('checked', false)
            }
        }

    })

    $('.header__top__search-form').on('click', (e) => {

        if ($(e.target).hasClass('jq-selectbox__select')) {
            if($(e.target).prev().closest('div').hasClass('dropdown')) {
                $(e.target).addClass('jq-selectbox__active')
            }else {
                $(e.target).removeClass('jq-selectbox__active')
            }
        }

        if ($(e.target).hasClass('jq-selectbox__select-text')) {
            if($(e.target).parents('div').eq(1).hasClass('dropdown')) {
                $(e.target).parent().addClass('jq-selectbox__active')          
            } else {
                $(e.target).parent().removeClass('jq-selectbox__active')
            }
        }
    })

 });

function dropdownArrow (e) {
    if (e.target.classList.contains('dropdown')) {
        e.target.classList.toggle('active__dropdown-icon')
    }
}

const headerBottomRight = document.querySelector('.header__bottom__right')
    headerBottomRight.addEventListener('click', dropdownArrow)

const footerTopBtn = document.querySelector('.footer__top__buttons')
    footerTopBtn.addEventListener('click', dropdownArrow)


const mainLeft = document.querySelector('.main__top__left')
mainLeft.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.tagName.toLowerCase() === 'a') {
        Array.from(mainLeft.querySelectorAll('a')).forEach(el => {
            el.classList.remove('active')
        })
        e.target.classList.add('active')
    }
})

const mainRight = document.querySelector('.main__top__right')
mainRight.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.tagName.toLowerCase() === 'button') {
        Array.from(mainRight.querySelectorAll('button')).forEach(el => {
            el.classList.remove('active-btn')
        })
        e.target.classList.add('active-btn')
    }
})

const accordion = document.querySelector('.accordion__wrapper')
accordion.addEventListener('click', (e) => {
    if (e.target.classList.contains('accordion')) {
        e.target.classList.toggle("activen")
        let nextElement = e.target.nextElementSibling
        if (nextElement.style.maxHeight) {
            nextElement.style.maxHeight = null;
        } else {
            nextElement.style.maxHeight = nextElement.scrollHeight + "px";
        }
    }
})


const templateBrand = `<div class="filters__number">
<input type="checkbox">
<label for="Apple">Apple</label>
</div>
<div class="filters__number">
<input type="checkbox">
<label for="Asus">Asus</label>
</div>
<div class="filters__number">
<input type="checkbox">
<label for="Lenovo">Lenovo</label>
</div>`

const templateColor = `<div class="filters__number">
<input type="checkbox">
<label for="Coffee">Coffee</label>
</div>
<div class="filters__number">
<input type="checkbox">
<label for="Red">Red</label>
</div>
<div class="filters__number">
<input type="checkbox">
<label for="Pink">Pink</label>
</div>
<div class="filters__number">
<input type="checkbox">
<label for="Yellow">Yellow</label>
</div>
`
accordion.addEventListener('click', (e) => {

    if(e.target.classList.contains('filters__show-more')) {
        const filterNumberWrap = e.target.closest('div')
        const btnAccordion = filterNumberWrap.parentElement.previousElementSibling
        const filterNumberItem = e.target.previousElementSibling
        const panel = filterNumberWrap.parentElement

        if (btnAccordion.classList.contains('accordion__brand')) {
            filterNumberItem.insertAdjacentHTML('beforeend', templateBrand)
            panel.style.maxHeight = '350px'
            e.target.style.display = 'none'
        }
        if (btnAccordion.classList.contains('accordion__color')) {
            filterNumberItem.insertAdjacentHTML('beforeend', templateColor)
            panel.style.maxHeight = '350px'
            e.target.style.display = 'none'
        }
        e.target.style.display = 'none'
    }
})

const filterBtn = document.querySelector('.filters-btn')
const aside = document.querySelector('aside')
filterBtn.addEventListener('click', () => {
    aside.classList.toggle('filters-active')
    filterBtn.classList.toggle('filters-btn-active')
})
