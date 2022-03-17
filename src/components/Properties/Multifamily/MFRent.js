// //component will provide form to add rents by type and by date

// import { useEffect, useState } from "react"
// import { isCompositeComponentWithType } from "react-dom/test-utils"


// export const MFRent = () => {
//     const [addition, setAddition] = useState({})
//     const [emptyList, setEmptyList] = useState([])
//     const [refresh, setRefresh] = useState(true)


//     useEffect(
//         () => {
//             const copy = [...emptyList]
//             copy.push("f")
//             setEmptyList(copy)
//         }, [refresh]
//     )

//     useEffect(
//         () => {
//             setAddition({})
//         }, []
//     )

    
//     return (
//         <>
//         {emptyList.map(item => {
//             return (
//             <>

//             <input
//             type="text"
//             onChange={
//                 (evt) => {
//                     const copy = {...addition}
//                     copy.name = evt.target.value
//                     setAddition(copy)
//                 }
//             }> Enter Text Here</input>
            
            
            
//             <button
//             onClick={
//                 () => {
//                     setRefresh(!refresh)
//                     console.log(emptyList)
        
//                 }
//             }
        
//             >Add Row</button>
//         </>
//             )})}
//     </>
//     )





// }


