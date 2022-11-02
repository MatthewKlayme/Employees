FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)
FilePond.setOptions({
    stylePanelAspectRatio: 150/100,
    imageReziseTargetWidth: 100,
    imageReziseTargetHeight: 150,
})
FilePond.parse(document.body);