let deleteCpf = null;

tableBody.addEventListener("click", async (e) => {
    if(e.target.classList.contains("trashDel")){
        deleteCpf = e.target.getAttribute("data-set")
        const dialogDeleteHosp = document.querySelector(".DeleteGuest")
        dialogDeleteHosp.showModal();

       const deleteCancelBtn = document.querySelector(".cancelDeleteHospede")
   deleteCancelBtn.addEventListener("click", () =>{
    dialogDeleteHosp.close();
   })
    }
})


 const deleteConfirmBtn = document.querySelector(".confirmProssesForDeleteHopede")
    deleteConfirmBtn.addEventListener("click", async () => {
         try{
            
            await fetch(`${config.API_URL}/new-guest/delete-guest/${deleteCpf}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json'}
            })
        } catch(error){
            console.error("Erro ao deletar hóspede:",  error)
        }

        
    })


   