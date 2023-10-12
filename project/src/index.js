// demonstrate seed reset
// for (let i = 0; i < 10; i++) {
//   console.log(i, $fx.rand(), $fx.randminter())
//   $fx.rand.reset();
//   $fx.randminter.reset();
// }

const sp = new URLSearchParams(window.location.search)
//  console.log(sp);

// this is how features can be defined
$fx.features({
  "Red x": 200,
  "Red y": 100,
})

function main() {
  ////////////////////////////////////// CABLES //////////////////////////////////////
  // disable rubberband effect on mobile devices
  document.getElementById('glcanvas').addEventListener('touchmove', (e)=>{ e.preventDefault(); }, false);

  function patchInitialized(patch) {
  }

  function patchFinishedLoading(patch) {
    // The patch is ready now, all assets have been loaded
  }

  const redx = $fx.getFeature("Red x")
  const redy = $fx.getFeature("Red y")
  console.log("redx", redx)
  console.log("redy", redy)

  document.addEventListener('CABLES.jsLoaded', function (event) {
    CABLES.patch = new CABLES.Patch({
      patch: CABLES.exportedPatch,
      prefixAssetPath: '',
      glCanvasId: 'glcanvas',
      glCanvasResizeToWindow: true,
      onPatchLoaded: patchInitialized,
      onFinishedLoading: patchFinishedLoading,
      canvas: {preserveDrawingBuffer: true}
    });
    CABLES.patch.setVariable('redx',redx)
    CABLES.patch.setVariable('redy',redy)
  });
  ////////////////////////////////////// CABLES //////////////////////////////////////
}

main()
