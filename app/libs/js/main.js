$('#registration input[type=email]').on('blur', function() {
    var email = $(this).val();

    if (email.length > 0 &&
        (email.match(/.+?\@.+/g) || []).length !== 1) {
        console.log('invalid');
        alert('Вы ввели некорректный e-mail!');
    } else {

    }
});


var lastScrollTop = 0;
$(window).scroll(function(event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        $('body').removeClass('minimizer-menu');
    } else {
        $('body').addClass('minimizer-menu');
    }
    lastScrollTop = st;
});



$(function() {
    $('.btn-purple').on('click', function(e) {
        $(this).addClass('active');
    });
});



$(function() {
    $('.btn-border').on('click', function(e) {
        $(this).addClass('active');
    });
});





$(function() {
    $('.modal button').on('click', function(e) {
        $(this).addClass('active');

    });
});

$(function() {
    $('.modal button').on('click', function(e) {
        $('.btn-purple').removeClass('active');
        $('.btn-border').removeClass('active');
    });
});



$(document).ready(function() {
    $("a").click(function() {
        setTimeout(function() {
            $('.btn-purple').removeClass('active');
            $('.btn-border').removeClass('active');
        }, 1500);
    });
});






$(document).ready(function() {
    $(".hasdrop").hover(function() {
        setTimeout(function() {
            $('body').toggleClass('no-hv');
        }, 155);
    });
});





$(document).ready(function() {
    $('body').addClass('no-hv');
});


$(document).ready(function() {
    $('body').addClass('shows');
});



$(document).ready(function() {
    $("header ul.main-nav li a").hover(function() {
        $('header').toggleClass('mvs');
    });

});







$(document).ready(function() {
    $(document).click(function(event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});



$(document).ready(function() {
    //main nav
    $(window).on('scroll load', function() {
        updateMainNav();
    });

    function updateMainNav() {
        if ($(window).scrollTop() >= 3) {
            $('body').addClass('minimize-menu');
        } else {
            $('body').removeClass('minimize-menu');
        }
    }
});


$(function() {
    $('.btn-send').on('click', function(e) {
        $('.modal-form').removeClass('show-block');
        $('.form-inform').removeClass('no-show-block');
        $('.form-1').removeClass('show-block');

        $(".modal").animate({ scrollTop: 0 }, "slow");



        e.preventDefault();
    });
});

$(function() {
    $('.btn-send2').on('click', function(e) {
        $('.form-send').removeClass('show-block');
        $('.form-info').removeClass('no-show-block');
        $('.form-info').addClass('show-block');
        $(".modal").animate({ scrollTop: 0 }, "slow");
    });
});




jQuery(document).ready(function($) {
    var dragging = false,
        scrolling = false,
        resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.cd-image-container');
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function() {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame) ?
            setTimeout(function() { checkPosition(imageComparisonContainers); }, 100): requestAnimationFrame(function() { checkPosition(imageComparisonContainers); });
        }
    });

    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function() {
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function() {
        if (!resizing) {
            resizing = true;
            (!window.requestAnimationFrame) ?
            setTimeout(function() { checkLabel(imageComparisonContainers); }, 100): requestAnimationFrame(function() { checkLabel(imageComparisonContainers); });
        }
    });

    function checkPosition(container) {
        container.each(function() {
            var actualContainer = $(this);
            if ($(window).scrollTop() + $(window).height() * 0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function() {
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;

            dragElement.parents().on("mousemove vmousemove", function(e) {
                if (!dragging) {
                    dragging = true;
                    (!window.requestAnimationFrame) ?
                    setTimeout(function() { animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement); }, 100): requestAnimationFrame(function() { animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement); });
                }
            }).on("mouseup vmouseup", function(e) {
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;
        //constrain the draggable element to move inside his container
        if (leftValue < minLeft) {
            leftValue = minLeft;
        } else if (leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue);

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging = false;
    }

    function updateLabel(label, resizeElement, position) {
        if (position == 'left') {
            (label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth()) ? label.removeClass('is-hidden'): label.addClass('is-hidden');
        } else {
            (label.offset().left > resizeElement.offset().left + resizeElement.outerWidth()) ? label.removeClass('is-hidden'): label.addClass('is-hidden');
        }
    }
});


$(document).ready(function() {
    $('#vidModal').on('hidden.bs.modal', function() {
        var $this = $(this).find('iframe'),
            tempSrc = $this.attr('src');
        $this.attr('src', "");
        $this.attr('src', tempSrc);
    });

});


$(document).ready(function() {
    $('#button_contacts').click(function() {
        var form_email = $('#form_email').val();
        $.ajax({
            url: "post.php",
            type: "post",
            dataType: "json",
            data: {
                "form_email": form_email,
            },
            success: function(data) {
                $('.messages').html(data.result);
            }
        });
    });
});


$(document).ready(function() {
    $('#button_contacts2').click(function() {
        var names = $('#names').val();
        var fnames = $('#fnames').val();
        var phones = $('#phones').val();
        var companys = $('#companys').val();
        $.ajax({
            url: "post2.php",
            type: "post",
            dataType: "json",
            data: {
                "names": names,
                "fnames": fnames,
                "phones": phones,
                "companys": companys,
            },
            success: function(data) {
                $('.messages2').html(data.result);
            }
        });
    });
});