import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//create your first component
const Home = () => {

	const [inputValue, setinputValue] = useState("")
	const [tasks, setTasks] = useState([])

	const handleAdd = (e) =>{
		
		if(e.key == "Enter"){
			if(inputValue != ""){
				// let newTasks = [...tasks]
				// newTasks.push(input)
				setTasks([...tasks,{label:inputValue,done:false}])
				putToDo([...tasks,{label:inputValue,done:false}])
				setinputValue("")
			}
			else{
				alert("No puede estar vacio")
			}
		}
	}

	const handleAddClick = () =>{
		
		if(inputValue != ""){
			setTasks([...tasks, inputValue])
			setinputValue("")
		}
		else{
				alert("No puede estar vacio")
		}
	}
	const handleDelete = (currentIndex)=>{
		let newTasks = tasks.filter((task, index)=> index != currentIndex)
		setTasks(newTasks)
		putToDo(newTasks)
	}

	const handleClick = (e)=>{
		console.log(e);
		if(e.target.style.textDecoration){
			e.target.style.removeProperty('text-decoration')
		}
		else{
			e.target.style.setProperty('text-decoration', 'line-through')
		}
	}

	useEffect(() => {
		getToDo()
	}, [])

	const getToDo = async () =>{
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ivanC",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
			
		setTasks(data)
	}

	const putToDo = async (newTasks) =>{
		
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ivanC",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(newTasks) 
		})
		let data = await response.json()
		if (response.ok){
			console.log(data)

			getToDo()
		}
	}



	return (
		<div className="row container">
			<div className="title">To-Do List</div>
			<div className="col list">
				<input className="bar"
					onChange={(e)=>setinputValue(e.target.value)} 
					value={inputValue} 
					onKeyDown={handleAdd} 
					type="text"
					placeholder="Add new..."
				/>
				<button className="addBtn" onClick={handleAddClick}>+</button>
			</div>

			<ListGroup className="col-12">
				{
					tasks.map((task,index)=>{
						return(
							<ListGroup.Item className="list todoTasks" key={index}>
								<p className="icon" htmlFor={`text${index}`} ><FontAwesomeIcon icon= {faCircleCheck} /></p>
								<p className= "task col" id= {`text${index}`} onClick={handleClick} >  
									{task.label}
								</p>
								<button className="btn" onClick={(e)=>handleDelete(index)}>
									<p className="col"><FontAwesomeIcon icon= {faXmark} /></p>
								</button>
							</ListGroup.Item>

						)})

				}					
			</ListGroup>
		</div>  
	);
};

export default Home;
