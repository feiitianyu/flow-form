export async function getTheFiles(accept, multiple) {
  // open file picker
  const fileHandles = await window.showOpenFilePicker({
    types: [{
      accept: {
        "file/*": accept?.split(",")
      },
    }],
    excludeAcceptAllOption: false,
    multiple: multiple,
  });

  return fileHandles;
}
