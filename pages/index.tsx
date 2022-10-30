
import styles from '../styles/Home.module.css'
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

import { createStudent, updateStudent, deleteStudent } from '../src/graphql/mutations';
import { listStudents } from '../src/graphql/queries';
import {useEffect, useState} from "react";




export default function Home() {
    const [studentList,setStudentList] = useState([])

    const listStu = async ()=>{
        const result = await API.graphql(graphqlOperation(listStudents));
        const {data:{listStudents:{items:students}}} = result as any
        setStudentList(students)
    }

    const add=async ()=>{
        await API.graphql(graphqlOperation(createStudent, {input: {
            name:"test",sex:true,
            }}));

        listStu()
    }

    const deleteStu=async (id:string="")=>{
        await API.graphql(graphqlOperation(deleteStudent, { input: { id }}));
        listStu()

    }

    const updateStu = async (id:string="",name:string,sex=false)=>{
        await API.graphql(graphqlOperation(updateStudent, { input: { id, name ,sex}}));
        listStu()

    }

    useEffect(()=>{
        console.log("------------use effect");
        listStu()
    },[])

  return (
    <div className={styles.container}>
        <div>
             <button onClick={()=>{
                 add()
             }}>add</button>

            <button onClick={()=>{
                // @ts-ignore
                deleteStu(studentList[0]?.id)
            }}>remove</button>

            <button onClick={()=>{
              // @ts-ignore
                updateStu(studentList[0]?.id,"test2222222222");
            }}>modify</button>
        </div>
        {studentList.map(({id,name,sex})=>{
            return <div key={id}>
               <div>
                   id:{id}
               </div>
                <div>
                    name:{name}
                </div>

                <div>
                    sex:{sex}
                </div>


            </div>
        })}
     hello aws 111 haahhah333333
    </div>
  )
}
