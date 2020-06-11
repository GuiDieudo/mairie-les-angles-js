function scroll_to(clicked_link, nav_height) {
  var element_class = clicked_link.attr("href").replace("#", ".")
  var scroll_to = 0
  if (element_class != ".top-content") {
    element_class += "-container"
    scroll_to = $(element_class).offset().top - nav_height
  }
  if ($(window).scrollTop() != scroll_to) {
    $("html, body")
      .stop()
      .animate({ scrollTop: scroll_to }, 1000)
  }
}

function changeIframe(e) {
  var link = $(e.currentTarget).data("link")
  var title = $(e.currentTarget).data("title")

  $(".embed-dynamic-title").html(title)

  $(".embed-dynamic-item").attr("src", link)
}

function cleanIframe() {
  $(".embed-dynamic-title").html("")
  $(".embed-dynamic-item").attr("src", "")
}

var timeoutInMiliseconds = 1000 * 60 * 5
var timeoutId

function startTimer() {
  timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}

function resetTimer() {
  window.clearTimeout(timeoutId)
  startTimer()
}

function doInactive() {
  $("#fullscreeniFrame").modal("hide")
  $(".embed-dynamic-title").html("")
  $(".embed-dynamic-item").attr("src", "")
  $(window).scrollTop(0)
}

function setupTimers() {
  document.addEventListener("mousemove", resetTimer, false)
  document.addEventListener("mousedown", resetTimer, false)
  document.addEventListener("keypress", resetTimer, false)
  document.addEventListener("touchmove", resetTimer, false)

  startTimer()
}

jQuery(document).ready(function() {
  /*
    Timeout
  */
  setupTimers()

  /*
    Loading
  */
  $("#loading").attr("style", "display: none !important")
  $("#main").removeClass("d-none")

  /*
    Animation
  */
  $("head").append(
    '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">'
  )

  $(".changer").click(function(e) {
    changeIframe(e)
  })

  $("#fullscreeniFrame").on("hidden.bs.modal", function() {
    cleanIframe()
  })

  /*
	    Navigation
	*/
  $("a.scroll-link").on("click", function(e) {
    e.preventDefault()
    scroll_to($(this), $("nav").outerHeight())
  })
  /*
	    Carousel
	*/
  $("#carousel-example").on("slide.bs.carousel", function(e) {
    /*
	        CC 2.0 License Iatek LLC 2018
	        Attribution required
	    */
    var $e = $(e.relatedTarget)
    var idx = $e.index()
    var itemsPerSlide = 5
    var totalItems = $(".carousel-item").length

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx)
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item")
            .eq(i)
            .appendTo(".carousel-inner")
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo(".carousel-inner")
        }
      }
    }
  })
})
