

$.ajax({
	url: 'https://raw.githubusercontent.com/erickrona/grammy-json/master/grammys.json',
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		let newHtml = ''

		for( let i = 0; i < data.fields.length; i++){
			newHtml += `
			<option value="${data.fields[i].field_id}">
				${data.fields[i].field}
			</option>
			`
		}
		$('#category_types').append(newHtml)
		loadCategoriesJSON()
	},
	error: function(errorMsg){
		console.log(errorMsg)

	},
})

//function loadCategoriesJSON(){

//$('#category_types').change(function(){	
function loadCategoriesJSON(){
	$.ajax({
	url: 'https://raw.githubusercontent.com/erickrona/grammy-json/master/grammys.json',
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		$('#category_types').on('change', function(event){
			let category_id = $(this).val()
			let newHtml = ''
			for(let i = 0; i < data.fields.length; i++){
				if(category_id == data.fields[i].field_id){
					//$('#nominees_section').val(data.fields[i].description)
					newHtml += `
					<h2>
						${data.fields[i].field}
					</h2>
					<p class= "description">
						${data.fields[i].description}
					</p>
					`
					for(let j = 0; j < data.fields[i].categories.length; j++){
						newHtml += `
						<h3>
							${data.fields[i].categories[j].category_name}
						</h3>
						`
						for(let k = 0; k < data.fields[i].categories[j].nominees.length; k++){

							if(k == data.fields[i].categories[j].winner_id){
								newHtml += 
								`
								<div style="width:50%; float:left; display:block;">
									<ul class="winner">
										<li>
											${data.fields[i].categories[j].nominees[k].nominee}
										</li>
									</ul>
								</div>
								<div style="width:50%; float:left; display:block; margin-top: 13px; margin-bottom: 13px;">
									<span>
										${"WINNER!"}
									</span>
								</div>
								<p class="info">
									${data.fields[i].categories[j].nominees[k].artist}
								</p>
								<p class="info">
									${data.fields[i].categories[j].nominees[k].info}
								</p>
								`
							}
							else{
								newHtml += 
								`
								<ul class="list">
									<li>
										${data.fields[i].categories[j].nominees[k].nominee}
									</li>
								</ul>
								<p class="info">
									${data.fields[i].categories[j].nominees[k].artist}
								</p>
								<p class="info">
									${data.fields[i].categories[j].nominees[k].info}
								</p>
								`
							}
									
						}
						if(j != data.fields[i].categories.length-1)
						{
							newHtml += `
							<hr>
							</hr>
							`
						}	
					}
				}
			} 
			$('#nominees_section').html("");
			$('#nominees_section').append(newHtml)
		})
	},
	error: function(errorMsg){
		console.log(errorMsg)
	},
})
}

