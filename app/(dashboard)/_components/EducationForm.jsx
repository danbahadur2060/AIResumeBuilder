import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data, onChange }) => {
    const addEducation =()=>{
        const newEducation= {
          institution:"",
          degree:"",
          field:"",
          graduation_date:"",
          gpa:""
        };
        onChange([...data,newEducation])
      }
      const removeEducation = (index)=>{
        const updated = data.filter((_,i)=> i !== index)
        onChange(updated)
      }
    
      const  updateEduacation =(index, field, value)=>{
        const updated = [...data]
        updated[index]= {...updated[index],[field]:value};
        onChange(updated)
      }
  return (
    <div className='space-y-6'>
    <div className='flex items-center justify-between'>
       <div>
           <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
           <p className='text-sm text-gray-500'>Add your education details</p>
       </div>
       <button onClick={addEducation} className='flex items-center  cursor-pointer gap-2 px-3 text-sm py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors'>
           <Plus className='w-4 h-4' />
           <span>Add Education</span>
       </button>
   </div>
   {
     data.length === 0 ? (
       <div className='text-center py-8 text-gray-500'> 
       <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
       <p className='text-sm text-gray-300'>No education added yet.</p>
       <p className='text-sm'> Click "Add Education" to get started.</p>
       </div>
     ):( 
       <div className='space-y-4'>
         {
           data.map((education,index)=>(
             <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3
             '>
               <div className='flex justify-between items-start'>
                 <h4>Education #{index + 1}</h4>
                 <button onClick={()=>removeEducation(index)} className='cursor-pointer text-red-500 hover:text-red-700 transition-colors'>
                   <Trash2 className='w-4 h-4'/>
                 </button>
               </div>

               <div className='grid md:grid-cols-2 gap-2'>
                 <input type="text" value={education.institution || ''} onChange={(e)=>updateEduacation(index,"institution",e.target.value)} placeholder='Institute Name' className='px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition' />

                 <input type="text" value={education.degree || ''} onChange={(e)=>updateEduacation(index,"degree",e.target.value)} placeholder="Degree (e.g, Bachelor's , Master  " className='px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition' />

                 <input type="text" value={education.field || ''} onChange={(e)=>updateEduacation(index,"field",e.target.value)} className='px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition' placeholder='Field of Study' />

                 <input type="month" value={education.graduation_date || ''} onChange={(e)=>updateEduacation(index,"graduation_date",e.target.value)} className='px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition'  />
               </div>
              
                 <input type="text" checked={education.gpa || false} onChange={(e)=> {updateEduacation(index,"gap",e.target.value)}} className='px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition' placeholder='GPA' />
             </div>
           ))
         }
       </div>
     )
   }
</div>
  )
}

export default EducationForm