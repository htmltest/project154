$(document).ready(function() {

    $('body').on('click', '.manager-table-arrow-left', function(e) {
        $(this).parent().find('.manager-table-wrapper').mCustomScrollbar('scrollTo', 'left');
        e.preventDefault();
    });

    $('body').on('click', '.manager-table-arrow-right', function(e) {
        $(this).parent().find('.manager-table-wrapper').mCustomScrollbar('scrollTo', 'right');
        e.preventDefault();
    });

    $('body').on('mouseover', '.manager-table-section', function(e) {
        var curBlock = $(this);
        $('.wrapper').append('<div class="manager-table-section-detail-window" style="left:' + curBlock.offset().left + 'px; top:' + curBlock.offset().top + 'px">' + curBlock.find('.manager-table-section-detail').html() + '</div>');
    });

    $('body').on('mouseout', '.manager-table-section', function(e) {
        $('.manager-table-section-detail-window').remove();
    });

});

$(window).on('load resize', function() {
    $('.manager-table-wrapper').each(function() {
        var curWrapper = $(this);
        if ($(window).width() > 1169) {
            curWrapper.mCustomScrollbar({
                axis: 'x',
                callbacks: {
                    onInit: function() {
                        curWrapper.parent().find('.manager-table-arrow-left').addClass('disabled');
                    },

                    whileScrolling: function() {
                        if (this.mcs.leftPct == 100) {
                            curWrapper.parent().find('.manager-table-arrow-right').addClass('disabled');
                        } else {
                            curWrapper.parent().find('.manager-table-arrow-right').removeClass('disabled');
                        }

                        if (this.mcs.leftPct == 0) {
                            curWrapper.parent().find('.manager-table-arrow-left').addClass('disabled');
                        } else {
                            curWrapper.parent().find('.manager-table-arrow-left').removeClass('disabled');

                        }
                    }
                }
            });
        } else {
            curWrapper.mCustomScrollbar('destroy');
        }
    });

    resizeManagerTables();
});

function resizeManagerTables() {
    $('.manager-table-container').each(function() {
        var curContainer = $(this);
        var newHTML = '';
        curContainer.find('.manager-table-head-fixed').each(function() {
            newHTML += '<div class="manager-table-head" style="height:' + $(this).outerHeight() + 'px">' + $(this).html() + '</div>';
        });
        curContainer.find('.manager-table-cell-fixed').each(function() {
            newHTML += '<div class="manager-table-cell manager-table-cell-action" style="height:' + $(this).outerHeight() + 'px">' + $(this).html() + '</div>';
        });
        curContainer.find('.manager-table-fixed').html(newHTML);
    });
}