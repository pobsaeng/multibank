select * from book order by price desc;

select max(price) from book
union
select max(price) from book
where price < (select max(price) from book)
union
select max(price) from book
where price < (select max(price) from book 
					where price < (select max(price) from book))

select distinct b.price 
from book b
where b.price <= (select max(price) from book)
order by price desc
limit 3;


select b.title, b.price 
from book b
where b.price >= (select max(price) from book where price < (select max(price) from book where price < (select max(price) from book)))
and b.price <= (select max(price) from book)
order by price desc

