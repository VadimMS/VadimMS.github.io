'use strict';

$(document).ready(function () {
    const hiddenScroll = () => {
        if (document.body.scrollHeight >= document.body.clientHeight) {
            let scrollTop = document.documentElement.scrollTop
                ? document.documentElement.scrollTop
                : document.body.scrollTop;
            document.documentElement.classList.add('no-scroll');
            document.documentElement.style.top = `${-scrollTop}px`;
        }
    };

    const visibleScroll = () => {
        let scrollTop = parseInt(document.documentElement.style.top);
        document.documentElement.classList.remove('no-scroll');
        document.documentElement.removeAttribute('style');
        document.documentElement.scrollTop = -scrollTop;
        document.body.scrollTop = -scrollTop;
    };

    // Accordion
    $(function () {
        $('.accordion').click(function (j) {
            const dropDown = $(this).closest('.questions__item').find('.questions__info');
            $(this).closest('.questions__wrapper').find('.questions__info').not(dropDown).slideUp();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.questions__wrapper').find('.accordion.active').removeClass('active');
                $(this).addClass('active');
            }

            dropDown.stop(false, true).slideToggle();
            j.preventDefault();
        });
    });

    // Replace not number
    const replaceNotNumber = input => {
        if (/\D/g.test(input.val())) {
            input.val(input.val().replace(/\D/g, ''));
        }
    };

    // Check input value
    const checkInputVal = input => {
        if (input.val()) {
            input.parent().addClass('active');
        } else {
            input.parent().removeClass('active');
        }
    };

    // Handle input
    const handleInput = inputs => {
        $('body').on('input blur', inputs, function (e) {
            const $this = $(this);

            if (e.type === 'focusout') {
                checkInputVal($this);
            } else if (e.type === 'input' && $this.is('[data-number]')) {
                replaceNotNumber($this);
            }
        });
    };

    if ($('.input-block .input').length) {
        handleInput('.input-block .input');
    }

    $('#InputNumberAuto').focusout(function () {
        if ($('#InputNumberAuto').val().length && !$('.input-block').hasClass('active')) {
            $('.input-block').addClass('active');
        }
        if ($('#InputNumberAuto').val().length === 3) {
            $('.input-block').removeClass('active');
        }
    });

    // Mask for number auto
    {
        $('input[name="number"]').inputmask({
            mask: 'n999nn99[9]',
            showMaskOnHover: false,
            placeholder: '',
            definitions: {
                n: {
                    validator: '[укенхваросмтetyopahkxcbm]',
                },
            },
        });
    }

    // Mask for number float
    {
        $('input[data-float-num]').inputmask({
            mask: '9{1,}[.]9{2,2}',
            showMaskOnHover: false,
            placeholder: '',
        });
    }

    // Mask for year
    {
        $('input[name="year"]').inputmask({
            mask: '9999',
            showMaskOnHover: false,
            placeholder: '',
        });
    }

    // Mask for phone
    {
        $('input[name="phone"]').inputmask({
            mask: '9999999999[9][9][9][9][9]',
            showMaskOnHover: false,
            placeholder: '',
        });
    }

    // Mask for VIN
    {
        $('input[name="vin"]').inputmask({
            mask: 'V{1,}',
            showMaskOnHover: false,
            placeholder: '',
            definitions: {
                V: {
                    validator: '[0-9A-Z]',
                },
            },
        });
    }

    // Mask for STS/PTS
    {
        $('input[name="stsPts"]').inputmask({
            mask: '** ** 999999',
            showMaskOnHover: false,
            placeholder: '',
        });
    }

    // Mask for passport
    {
        $('input[name="passport"], input[name="passport-step-4"]').inputmask({
            mask: '9999 999999',
            showMaskOnHover: false,
            placeholder: '',
        });
    }

    // Validation
    {
        $('.form-validate').each(function () {
            $(this).validate({
                rules: {
                    number: {
                        required: true,
                        minlength: 8,
                        maxlength: 9,
                        normalizer: function (value) {
                            return value.toUpperCase();
                        },
                    },
                    stsPts: {
                        required: true,
                        minlength: 12,
                        maxlength: 12,
                    },
                    passport: {
                        required: true,
                        minlength: 11,
                        maxlength: 11,
                    },
                    ['passport-step-4']: {
                        required: true,
                        minlength: 11,
                        maxlength: 11,
                    },
                },
                messages: {
                    number: {
                        required: 'Укажите номер авто',
                        minlength: 'Номер авто указан не корректно',
                    },
                    name: {
                        required: 'Введите Ваше имя',
                    },
                    phone: {
                        required: 'Укажите номер телефона для связи',
                    },
                    message: {
                        required: 'Напишите интересующий Вас вопрос',
                    },
                },
            });
        });
    }

    // WOW
    {
        const wow = new WOW({
            mobile: true,
        });

        wow.init();
    }

    // Slider
    {
        new Swiper('.swiper-container', {
            slidesPerView: 5,
            spaceBetween: 70,
            loop: true,
            breakpoints: {
                479: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                680: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
                1366: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            },
        });
    }

    // Handle menu
    const handleMenu = (() => {
        const headerMenu = $('.header__menu');
        const overlay = $('.menu-bg');

        const toggleMenu = () => {
            $('.header__menu-btn').on('click', function () {
                headerMenu.toggleClass('header__menu--active');
                overlay.toggleClass('menu-bg--active');

                if ($('html').hasClass('no-scroll')) {
                    visibleScroll();
                } else {
                    hiddenScroll();
                }
            });
        };

        const closeMenu = () => {
            headerMenu.removeClass('header__menu--active');
            overlay.removeClass('menu-bg--active');

            visibleScroll();
        };

        const scrollTOSection = () => {
            $('.header__menu').on('click', 'a', function (event) {
                event.preventDefault();

                if ($('html').hasClass('no-scroll')) {
                    closeMenu();
                }

                const id = $(this).attr('href'),
                    top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, 1500);
            });
        };

        const replaceHref = () => {
            const links = $('.header__menu-list').find('a[href*="#"]');

            links.each((_, link) => {
                const id = $(link).attr('href');
                link.href = `/index.html${id}`;
            });
        };

        return {
            toggleMenu,
            closeMenu,
            scrollTOSection,
            replaceHref,
        };
    })();

    handleMenu.toggleMenu();

    if (!$('#advantages').length || !$('#calculator').length || !$('#questions').length) {
        handleMenu.replaceHref();
    } else {
        handleMenu.scrollTOSection();
    }

    // Add position sticky for IE
    {
        const box = $('#advantages .container');
        const stickyEl = box.find('.title-content');

        const addSticky = (wrap, top) => {
            const wrapTopPos = wrap.offset().top;
            const wrapHeight = wrap.height();
            const stickyElHeight = stickyEl.height();
            const botPos = wrapTopPos + wrapHeight;
            const botPosH = botPos - stickyElHeight;

            if (top < wrapTopPos || stickyElHeight >= wrapHeight) {
                stickyEl.removeClass('pos-fix').removeClass('pos-abs');
            } else {
                top >= wrapTopPos && top <= botPosH
                    ? stickyEl.removeClass('pos-abs').addClass('pos-fix')
                    : stickyEl.removeClass('pos-fix').addClass('pos-abs');
            }
        };

        const removeSticky = el => {
            el.removeClass('pos-abs pos-fix');
        };

        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
            box.find('.pos-sticky').removeClass('pos-sticky');

            const mq768 = window.matchMedia('(min-width: 768px)');
            const mq680 = window.matchMedia('(max-width: 680px)');
            const img = document.getElementById('image-util');

            const changeSrc = () => {
                if (mq680.matches) {
                    img.src = 'img/main-content-img.png';
                } else {
                    img.src = 'img/woman.png';
                }
            };
            changeSrc();

            const toggleStickySupport = () => {
                if (mq768.matches) {
                    $(window).on('scroll.sticky', function () {
                        let top = $(document).scrollTop();

                        addSticky(box, top);
                    });
                } else {
                    $(window).off('scroll.sticky');
                    removeSticky(stickyEl);
                }
            };
            toggleStickySupport();

            mq768.addListener(toggleStickySupport);
            mq680.addListener(changeSrc);
        }
    }

    // Rido buttons get text
    const radioBtnFunctional = radioBtn => {
        if (radioBtn.is('#labelSTS')) {
            $('#labelInputNumberSTS').text('Номер СТС');
        }
        if (radioBtn.is('#labelPTS')) {
            $('#labelInputNumberSTS').text('Номер ПТС');
        }
        if (radioBtn.is('#labelVIN')) {
            $('#inputNumberVIN').attr('required', 'true');
            $('#BlockInputNumberVIN').stop().fadeIn();
        }
        if (radioBtn.is('#labelNoVIN')) {
            $('#inputNumberVIN').removeAttr('required');
            $('#BlockInputNumberVIN').stop().fadeOut();
        }
        if (radioBtn.hasClass('driver')) {
            $('.del input').removeAttr('required');
            $('.fields-util--radio').stop().slideUp();
            $('#driverName').text($('.driver').text());
        }
        if (radioBtn.is('#labelOtherDriver')) {
            $('.del input').attr('required', 'true');
            $('.fields-util--radio').stop().slideDown();
            $('#driverName').text($('#inputDriverName').val());
            $('#inputDriverName').on('input', () => {
                $('#driverName').text($('#inputDriverName').val());
            });

            if ($('#inputDriverName').val().length) {
                $('#driverName').text($('#inputDriverName').val());
            }
        }
    };

    // Ste/get session
    const sessionStorageForm = () => {
        const elements = document.querySelectorAll('input');

        [...elements].forEach(element => {
            const id = element.getAttribute('id');

            if (element.classList.contains('custom-checkbox')) {
                element.addEventListener('change', function () {
                    if (element.checked) {
                        sessionStorage.setItem(id, true);
                    } else {
                        sessionStorage.setItem(id, false);
                    }
                });
                if (sessionStorage.getItem(id) === 'true') {
                    element.checked = true;
                }
                return;
            }
            if (element.classList.contains('radio-btn')) {
                const elementName = element.getAttribute('name');

                element.addEventListener('change', function () {
                    sessionStorage.setItem(elementName, this.value);
                });

                if (sessionStorage.getItem(elementName)) {
                    const radioValue = sessionStorage.getItem(elementName);

                    document.querySelector(`input[name="${elementName}"][value="${radioValue}"]`).checked = true;
                }

                if (sessionStorage.getItem(id)) {
                    const radioValue = sessionStorage.getItem(id);

                    document.querySelector(`input[id="${id}"][value="${radioValue}"]`).checked = true;
                }
                return;
            }
            if (sessionStorage.getItem('color-2')) {
                $('#driverName').text(sessionStorage.getItem('inputDriverName'));
            }
            if (element.classList.contains('datepicker-here')) {
                element.addEventListener('blur', function () {
                    sessionStorage.setItem(id, element.value);
                });
            } else {
                element.onchange = function () {
                    sessionStorage.setItem(id, element.value);
                };
            }
            if (sessionStorage.getItem(id)) {
                element.value = sessionStorage.getItem(id);
            }
        });

        Array.from(elements).map(el => {
            if (el.value.length) {
                el.parentElement.classList.add('active');
            }
            el.addEventListener('blur', function () {
                if (this.classList.contains('valid')) {
                    this.parentElement.classList.add('active');
                }
            });
        });
    };

    // Change checkbox
    const changeCheckbox = checkbox => {
        checkbox.on('change', function () {
            const $this = $(this);
            const fields = $this.closest('.step-four__inputs').find('.fields-util--checkbox');

            if ($this.prop('checked')) {
                fields.stop().slideUp('400', function () {
                    fields.find('input').each((_, input) => {
                        const $input = $(input);
                        $input.removeAttr('required');
                        $input.val('');
                        checkInputVal($input);
                        sessionStorage.removeItem($input.attr('id'));
                    });
                });
                return;
            }

            fields.stop().slideDown();
            fields.find('input').each((_, input) => {
                $(input).attr('required', true);
            });
        });
    };

    // Check year of car
    const checkYearOfCar = (inputYear, step) => {
        if (Number(step) !== 1) return;

        const wrap = $('#steps').find('.step-four__inputs--auxiliary-fields');
        const curYear = new Date().getFullYear();
        const carYear = Number(inputYear.val());
        const varianceYears = curYear - carYear;

        if (carYear < curYear && varianceYears > 4) {
            wrap.css('display', 'block');
        } else {
            if (wrap.is('[style="display: block;"]')) {
                wrap.css('display', 'none');
            }

            wrap.find('input').each((_, input) => {
                const $input = $(input);
                const id = $input.attr('id');

                if (sessionStorage.getItem(id) && $input.val() === sessionStorage.getItem(id)) {
                    $input.val('');
                    sessionStorage.removeItem(id);
                    checkInputVal($input);
                }
            });
        }
    };

    // Add new driver
    const addNewDriver = () => {
        const driverList = $('.driver-list');
        const radionWrap = $('.step-two__form .switch-field');
        const label = driverList.find('#license1 + .label');
        const wrapBtnAdd = driverList.parent().find('.addEdit-button.add-driver');
        let removedWrapBtnAdd;
        let htmlObj = {};
        let counter = 1;

        const createHTML = id => {
            return `
                <div class="step-two__inputs driver-list__driver" data-driver="${id}">
                    <span class="driver-list__number">Водитель #</span>
                    <div class="remove-driver-btn">
                        <button type="button">Удалить</button>
                    </div>
                    <div class="input-block__wrapper">
                        <div class="input-block__item">
                            <div class="input-block">
                                <input class="input" id="fullName${id}" type="text" name="fullName${id}" required>
                                <label class="label">Фамилия Имя Отчество</label>
                            </div>
                            <div class="input-block">
                                <input class="input datepicker-here" id="dateOfBirth${id}" name="dateOfBirth${id}" type="text" readonly required>
                                <label class="label">Дата рождения</label>
                            </div>
                        </div>
                        <div class="input-block__item">
                            <div class="input-block">
                                <input class="input" id="license${id}" type="text" name="license${id}" required>
                                <label class="label">ВУ</label>
                            </div>
                            <div class="input-block">
                                <input class="input datepicker-here" id="startDate${id}" name="startDate${id}" type="text" readonly required>
                                <label class="label">Дата начала стажа</label>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };

        const removeBtn = () => {
            label.text('Паспортные данные');
            removedWrapBtnAdd = wrapBtnAdd.remove();
        };

        const setSession = (id, html) => {
            htmlObj[id] = html;
            sessionStorage.setItem('drivers', JSON.stringify(htmlObj));
        };

        const rewriteSession = (id, inputs) => {
            const session = JSON.parse(sessionStorage.getItem('drivers'));

            htmlObj = session;
            delete htmlObj[id];
            sessionStorage.setItem('drivers', JSON.stringify(htmlObj));

            inputs.each((_, input) => {
                const inputID = $(input).attr('id');

                if (sessionStorage.getItem(inputID)) {
                    sessionStorage.removeItem(inputID);
                }
            });
        };

        const getSession = () => {
            if (sessionStorage.getItem('drivers')) {
                const session = JSON.parse(sessionStorage.getItem('drivers'));

                if ($.isEmptyObject(session)) {
                    sessionStorage.removeItem('drivers');
                    return;
                }

                htmlObj = session;
                const keys = Object.keys(htmlObj);
                counter = Number(keys[keys.length - 1]);

                for (const key in htmlObj) {
                    driverList.append(htmlObj[key]);

                    const inputs = $(`[data-driver="${key}"]`).find('input');

                    inputs.each((_, input) => {
                        const $input = $(input);

                        $input.val(sessionStorage.getItem($input.attr('id')));
                        checkInputVal($input);
                    });

                    $(`#dateOfBirth${key}`).datepicker();
                    $(`#startDate${key}`).datepicker();
                }
            }

            if (
                sessionStorage.getItem('stepTwoswitch-one') &&
                sessionStorage.getItem('stepTwoswitch-one') === 'Без ограничений'
            ) {
                removeBtn();
            }
        };
        getSession();

        driverList.parent().on('click', '.add-driver button', function () {
            counter++;
            driverList.append(createHTML(counter));

            $(`#dateOfBirth${counter}`).datepicker();
            $(`#startDate${counter}`).datepicker();

            setSession(counter, createHTML(counter));
        });

        driverList.on('click', '.remove-driver-btn', function () {
            const item = $(this).closest('[data-driver]');
            const inputs = item.find('input');

            item.find('.datepicker-here').each((_, datapicker) => {
                $(datapicker).datepicker().data('datepicker').destroy();
            });

            rewriteSession(item.data('driver'), inputs);
            item.remove();
        });

        driverList.off('blur').on('blur', '[data-driver] input', function () {
            const $this = $(this);

            sessionStorage.setItem($this.attr('id'), $this.val());
        });

        radionWrap.on('change', 'input[type="radio"]', function () {
            const $this = $(this);

            if ($this.val() === 'Без ограничений') {
                const items = driverList.find('[data-driver]');

                removeBtn();

                if (!items.length) return;

                sessionStorage.removeItem('drivers');

                items.each((_, item) => {
                    const $item = $(item);

                    $item.find('input').each((_, input) => {
                        const $input = $(input);
                        const id = $input.attr('id');

                        if ($input.hasClass('datepicker-here')) {
                            $input.datepicker().data('datepicker').destroy();
                        }

                        if (sessionStorage.getItem(id)) {
                            sessionStorage.removeItem(id);
                        }
                    });

                    $item.remove();
                });
            } else {
                label.text('ВУ');
                driverList.after(removedWrapBtnAdd);
            }
        });
    };

    // Check session step
    const checkSessionStep = () => {
        if (sessionStorage.getItem('data-step')) {
            $('.active[data-step]').removeClass('active').css('display', 'none');
            $(`[data-step="${sessionStorage.getItem('data-step')}"]`)
                .addClass('active')
                .css('display', 'block');
        }
    };

    // Transition for steps
    const transitionCommonFn = (wrap, step) => {
        wrap.removeClass('active').fadeOut(300, function () {
            step.addClass('active').fadeIn(300);
            $('body,html').animate({scrollTop: top}, 0);
        });

        sessionStorage.setItem('data-step', step.data('step'));
    };

    const transitionOnSteps = mainEl => {
        mainEl.on('submit.nextStep', '[data-form]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const wrap = $this.closest('[data-step]');
            const btn = $this.find('[data-step-next]');

            if ($this.valid()) {
                if ($this.is('[data-last-form]')) {
                    transitionCommonFn(wrap, $('[data-step="1"]'));
                    sessionStorage.clear();
                    mainEl.find('form').each((_, form) => {
                        form.reset();
                    });

                    return;
                }

                const nextStep = $('body').find(`[data-step=${btn.data('step-next')}]`);

                checkYearOfCar($('#year'), wrap.data('step'));
                transitionCommonFn(wrap, nextStep);
            }
        });

        mainEl.on('click.nextStep', '.step-three__btn[data-step-next]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const wrap = $this.closest('[data-step]');
            const nextStep = $('body').find(`[data-step=${$this.data('step-next')}]`);

            transitionCommonFn(wrap, nextStep);
        });

        mainEl.on('click.prevStep', '[data-step-prev]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const wrap = $this.closest('[data-step]');
            const prevStep = $('body').find(`[data-step=${$this.data('step-prev')}]`);

            transitionCommonFn(wrap, prevStep);
        });
    };

    if ($('#steps').length) {
        checkSessionStep();
        sessionStorageForm();
        checkYearOfCar($('#year'), $('[data-step="1"]').data('step'));
        transitionOnSteps($('#steps'));

        $('#radioBtns').on('click', 'label', function () {
            radioBtnFunctional($(this));
        });

        if (sessionStorage.getItem('switch-one1') === 'СТС' || !sessionStorage.getItem('switch-one1')) {
            $('#labelInputNumberSTS').text('Номер СТС');
        } else {
            $('#labelInputNumberSTS').text('Номер ПТС');
        }

        if (sessionStorage.getItem('switch-one2') === 'VIN' || !sessionStorage.getItem('switch-one2')) {
            $('#inputNumberVIN').attr('required', 'true');
            $('#BlockInputNumberVIN').stop().fadeIn();
        } else {
            $('#inputNumberVIN').removeAttr('required');
            $('#BlockInputNumberVIN').stop().fadeOut();
        }

        if (sessionStorage.getItem('color') === 'no') {
            $('.fields-util--radio').stop().slideDown();
            $('.del input').attr('required', 'true');
            $('#inputDriverName').on('input', () => {
                $('#driverName').text($('#inputDriverName').val());
            });
        }

        addNewDriver();
        changeCheckbox($('#stepFourCheck'));

        if (sessionStorage.getItem('stepFourCheck') && sessionStorage.getItem('stepFourCheck') === 'true') {
            $('#stepFourCheck').trigger('change');
        }
    }

    // Resize function
    (function resizeFn() {
        let doit;

        const resized = () => {
            if ($('html').hasClass('no-scroll')) {
                handleMenu.closeMenu();
            }
        };

        window.onresize = () => {
            clearTimeout(doit);
            doit = null;
            doit = setTimeout(resized, 100);
        };
    })();
});
