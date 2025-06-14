// This is a React Router v6 app
import { useNavigate } from "react-router-dom";

export default function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  const data = [
    {
      title: "1",
      child: [
        {
          title: "1_a",
          child: [
            {
              title: "1_a_1",
              child:[]
            },
          ],
        },
      ],
    },
    {
      title: "2",
      child: [
        {
          title: "2_a",
          child: [
            {
              title: "2_a_1",
              child:[]
            },
          ],
        },
      ],
    },
  ];

  const handleTitle = (child:any)=>{

    const result = []
    for(const item of child ){
      result.push(item.title)
      if(item?.child?.length){
        const x:any =  handleTitle(item.child)

        result.push(x)
      }
      
    }

    return result
  }
const data2 =  handleTitle(data);
console.log(data2)
  return (
    <div className="l-container h-2 bg-red-500 gap-10">
    </div>
  );
}
