const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('real-file-input');
const fileNameDisplay = document.getElementById('selected-file-name');
const convertBtn = document.getElementById('convert-btn');
const delBtn = document.getElementById('delete-file-btn');


uploadBtn.addEventListener('click', function(){
    fileInput.click();
});

fileInput.addEventListener('change', function(){
    if(fileInput.files.length>0){
        fileNameDisplay.textContent = "Selected: "+ fileInput.files[0].name;
        fileNameDisplay.style.color = "green";
        convertBtn.disabled = false;
        delBtn.style.display = "block";
        // console.log(fileInput.files)
        // console.log(fileInput.files[0])

    } else {
        resetFileSelection();
    }
});

delBtn.addEventListener('click', function(e){
    e.stopPropagation();
    resetFileSelection();
});

convertBtn.addEventListener('click', async(e) => {
    convertBtn.disabled = true;
    const formData = new FormData();
    formData.append('pdf', fileInput.files[0])
    try{
        convertBtn.textContent = "Processing...";
        const response = await fetch(
            "/upload",
            {
                method: "POST",
                body: formData 
            }
        )
        const result = await response.blob(); 
        const objectURL = URL.createObjectURL(result);
        const disposition = response.headers.get('content-disposition');
        const matches = disposition ? disposition.match(/filename="?([^"]+)"?/) : null;
        const downloadFileName = matches ? matches[1] : 'downloaded_file';
        const link = document.createElement('a');
        link.href = objectURL;
        link.download = downloadFileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        console.log(downloadFileName);
        console.log(result);
        URL.revokeObjectURL(objectURL);
    } catch (error) {
        console.error("Download failed:", error);
        convertBtn.style.backgroundColor = "red";
        convertBtn.style.color = "white";
        convertBtn.textContent = "Failed.";
        convertBtn.disabled = false;
    
    } finally {
        convertBtn.disabled = true;
        convertBtn.style.backgroundColor = "green";
        convertBtn.style.color = "white";
        convertBtn.textContent = "Downloaded";
    }
});


function resetFileSelection(){
    fileInput.value = "";
    delBtn.style.display = "none";
    fileNameDisplay.textContent = "No Chosen File";
    fileNameDisplay.style.color = "red";
    convertBtn.disabled = true;

}
