document.getElementById("getUsers").addEventListener('click', getUsers);
document.getElementById("getPosts").addEventListener('click', getPosts);
document.getElementById("postform").addEventListener('submit', postform);
window.onload=getPosts();
					
function getUsers(){		
	fetch('https://jsonplaceholder.typicode.com/users')
	.then((res) => res.json())
	.then((data) => {
		let output ='<h1 class="mb-4 text-danger">Users</h1>';
		data.forEach(function(user){
			output += `						
				<ul class="list-group mb-4">
					<li class="list-group-item">${user.id} <img src="user_photos/slika${user.id}.png"  title="${user.name}" alt="${user.name}"></li>
					<li class="list-group-item">Name: ${user.name}</li>
					<li class="list-group-item">Username: ${user.username}</li>
					<li class="list-group-item">Email: ${user.email}</li>
					<li class="list-group-item">Address:
						<ul class="list-group">
							<li class="list-group-item">Street: ${user.address.street}</li>
							<li class="list-group-item">Suite: ${user.address.suite}</li>
							<li class="list-group-item">City: ${user.address.city}</li>
							<li class="list-group-item">Zipcode: ${user.address.zipcode}</li>
							<li class="list-group-item">Geo: lat: ${user.address.geo.lat}, lng: ${user.address.geo.lng}</li>								
						</ul>
					</li>
					<li class="list-group-item">Phone: ${user.phone}</li>
					<li class="list-group-item">Website: ${user.website}</li>
					<li class="list-group-item">Company:
						<ul class="list-group">
							<li class="list-group-item">Name: ${user.company.name}</li>
							<li class="list-group-item">Catch Phrase: ${user.company.catchPhrase}</li>
							<li class="list-group-item">Bs: ${user.company.bs}</li>
						</ul>
					</li>
				</ul>
			`;
		});
		document.getElementById('output').innerHTML = output;
	})
	.catch((error) => {
		   console.error('Error:', error);
		  });
}
		
function getComments(x, y) {		
	fetch('https://jsonplaceholder.typicode.com/comments?postId=' + x)
	.then((res) => res.json())
	.then((data) => {
		let kom ='<h2>Comments for Post number ' + x +' by User number ' + y  + '</h2>';
		data.forEach(function(comment){
			kom += `
				<ul class="list-group mb-4">
					<li class="list-group-item bg-warning text-white">${comment.name}</li>
					<li class="list-group-item text-warning">${comment.body}</li>
					<li class="list-group-item">By: ${comment.email}</li>
					<li class="list-group-item">Comment Id: ${comment.id}</li>																				
				</ul>
			`;
		});
		document.getElementById('kom').innerHTML = kom;
		console.log(kom);
	})			
	.catch((error) => {
	console.error('Error:', error);
	});	
			
	var modal = document.getElementById("myModal");
			
	modal.style.display = "block";
			
	window.onclick = function(event) {
			if (event.target == modal) {
		modal.style.display = "none";
			}
	}		
}
		
function getPosts(){		
	fetch('https://jsonplaceholder.typicode.com/posts')
	.then((res) => res.json())
	.then((data) => {				
		let output =`<h1 class="mb-4 text-primary">Posts</h1>
					<table class="table table-striped table-hover table-bordered align-middle">
							<thead><tr>																 
						<th>Title</th>
						<th colspan="2">Post</th>								
							</tr></thead>`;
				
		data.forEach(function(post){																												
				output += `
				<tr>						 						 
				 <td>${post.title}</td>
					<td>${post.body}</td>
					<td><button class="btn btn-outline-primary" onclick="getComments(${post.id},${post.userId})">Details</button></td>
				</tr>						
			`;					
		});													
		output += '</table>';
		document.getElementById('output').innerHTML = output;												
	})
	.catch((error) => {
		   console.error('Error:', error);
		  });
}
			
function postform(e){	
	e.preventDefault();
			
	let title = document.getElementById("title").value;
	let body = document.getElementById("body").value;
				
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({title:title, body:body})
	})
	.then((res)=> res.json())
	.then((data)=> console.log(data))
}