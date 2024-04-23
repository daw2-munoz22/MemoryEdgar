export function Avatar({usuario}){
    const {email, imagen} = usuario
    return(
      <div className="flex gap-2 items-center">
        <div>{email}</div>
        <div className="w-[50px] h-[50px] border rounded-full overflow-hidden">
          <img src={imagen} alt="" />
        </div>
      </div>
    )
  }