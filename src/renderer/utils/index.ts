function makeId(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function calculateMediaDuration(media: HTMLVideoElement): Promise<number> {
  return new Promise((resolve) => {
    media.onloadedmetadata = function () {
      // set the mediaElement.currentTime  to a high value beyond its real duration
      media.currentTime = Number.MAX_SAFE_INTEGER;
      // listen to time position change
      media.ontimeupdate = function () {
        media.ontimeupdate = function () {
          //
        };
        // setting player currentTime back to 0 can be buggy too, set it first to .1 sec
        media.currentTime = 0.1;
        media.currentTime = 0;
        // media.duration should now have its correct value, return it...
        resolve(media.duration);
      };
    };
  });
}

const saveBlob = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  return function (data: string, fileName: string) {
    // const blob = new Blob(data);
    // const url = window.URL.createObjectURL(blob);
    const url = data;
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();

export { makeId, calculateMediaDuration, saveBlob };
