create database Reg
use Reg

create table Registration(
Id int not null identity primary key(Id),
UserName nvarchar(max),
Email nvarchar(max),
[Password] nvarchar(16),
PasswordCheck nvarchar(16) 
);

drop table Registration