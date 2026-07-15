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
        console.log(fileInput.files)
        console.log(fileInput.files[0])

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
    convertBtn.textContent = "uploading..."
    const formData = new FormData()
    formData.append('pdf', fileInput.files[0])
    try{
        const response = await fetch(
            "/upload",
            {
                method: "POST",
                body: formData 
            }
        )
        console.log(response)
    } finally {
        convertBtn.disabled = true
        convertBtn.textContent = "Uploading..."
    }
});


function resetFileSelection(){
    fileInput.value = "";
    delBtn.style.display = "none";
    fileNameDisplay.textContent = "No Chosen File";
    fileNameDisplay.style.color = "red";
    convertBtn.disabled = true;

}
