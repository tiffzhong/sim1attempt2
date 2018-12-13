update products
set name = $2, price = $3, image_url = $4 
where id = $1
returning *;