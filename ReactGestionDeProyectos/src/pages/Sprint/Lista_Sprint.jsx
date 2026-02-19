
function Sprint () {
    

    return (

        <form>
                <label>Nombre del sprint</label>
                <input type="text" className="border border-GreenLite m-3"/><input/>
                <br />
                <label className="">Fecha del inicio</label>
                <input type="date" className="border border-GreenLite m-3"/><input/>
                <br />
                <label>Fecha de finalización </label>
                <input type="date" className="border border-GreenLite m-3"/><input/>
                <br />
                <label className="">Meta del Sprint</label>
                <br />
                <textarea name="meta_sprint" id="meta_sprint" className="border border-GreenLite m-3"></textarea>

            </form>
    )
}

export default Sprint