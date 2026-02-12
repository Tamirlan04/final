$(document).ready(function() {
  $(".g-item img").click(function() {
    const src = $(this).attr("src");
    $("#modalImage").attr("src", src);
    $("#imageModal").modal("show");
  });
});


