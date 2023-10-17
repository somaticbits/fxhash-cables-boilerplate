// demonstrate seed reset
// for (let i = 0; i < 10; i++) {
//   console.log(i, $fx.rand(), $fx.randminter())
//   $fx.rand.reset();
//   $fx.randminter.reset();
// }

const sp = new URLSearchParams(window.location.search)
//  console.log(sp);

// this is how to define parameters
$fx.params([
	{
		id: "number_id",
		name: "A number/float64",
		type: "number",
		//default: Math.PI,
		options: {
			min: 1,
			max: 10,
			step: 0.0001,
		},
	},
	{
		id: "bigint_id",
		name: "A bigint",
		type: "bigint",
		update: "code-driven",
		//default: BigInt(Number.MAX_SAFE_INTEGER * 2),
		options: {
			min: Number.MIN_SAFE_INTEGER * 4,
			max: Number.MAX_SAFE_INTEGER * 4,
			step: 1,
		},
	},
	{
		id: "string_id_long",
		name: "A string long",
		type: "string",
		update: "code-driven",
		//default: "hello",
		options: {
			minLength: 1,
			maxLength: 512,
		},
	},
	{
		id: "select_id",
		name: "A selection",
		type: "select",
		update: "code-driven",
		//default: "pear",
		options: {
			options: ["apple", "orange", "pear"],
		},
	},
	{
		id: "color_id",
		name: "A color",
		type: "color",
		update: "code-driven",
		//default: "ff0000",
	},
	{
		id: "boolean_id",
		name: "A boolean",
		type: "boolean",
		update: "code-driven",
		//default: true,
	},
	{
		id: "string_id",
		name: "A string",
		type: "string",
		update: "code-driven",
		//default: "hello",
		options: {
			minLength: 1,
			maxLength: 512,
		},
	},
])

// this is how features can be defined
$fx.features({  // this is how to define features
	"feature one": 200,
	"feature two": 100,
})

function main() {
	////////////////////////////////////// CABLES //////////////////////////////////////

	// disable rubberband effect on mobile devices
	document.getElementById("glcanvas").addEventListener("touchmove", (e) => {
		e.preventDefault();
	}, false);

	function patchInitialized(patch) {
	}

	function patchFinishedLoading(patch) {
		// The patch is ready now, all assets have been loaded
	}

	document.addEventListener("CABLES.jsLoaded", function (event) {
		CABLES.patch = new CABLES.Patch({
			patch: CABLES.exportedPatch,
			prefixAssetPath: "",
			glCanvasId: "glcanvas",
			glCanvasResizeToWindow: true,
			onPatchLoaded: patchInitialized,
			onFinishedLoading: patchFinishedLoading,
			canvas: {preserveDrawingBuffer: true}
		});

		// this is how to set features
		CABLES.patch.setVariable("feature_one", $fx.getFeature("feature one"))
		CABLES.patch.setVariable("feature_two", $fx.getFeature("feature two"))

		// this is how to set parameters
		CABLES.patch.setVariable("number_id", $fx.getParam("number_id"))
		CABLES.patch.setVariable("bigint_id", $fx.getParam("bigint_id"))
		CABLES.patch.setVariable("string_id_long", $fx.getParam("string_id_long"))
		CABLES.patch.setVariable("select_id", $fx.getParam("select_id"))
		CABLES.patch.setVariable("color_id", $fx.getParam("color_id"))
		CABLES.patch.setVariable("boolean_id", $fx.getParam("boolean_id"))
		CABLES.patch.setVariable("string_id", $fx.getParam("string_id"))
	});

	////////////////////////////////////// CABLES //////////////////////////////////////
}

main();
