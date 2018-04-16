#!/usr/bin/octave -qf
clc;
clear;
in_file_path = './cpp/in.txt' ;
data = importdata(in_file_path) ;
global in_G_ind = data(1,1) ;%индекс функци G
data(1,:) = [] ;

global in_L0 = data(1,1);%кол-во начальных точек
data(1,:) = [] ;
global in_S0 = data(1:in_L0,1:3);%начальные точки
global in_Y0 = data(1:in_L0,4);%значения в начальных точках
data(1:in_L0,:) = [] ;

global in_LG = data(1,1);%кол-во граничных точек
data(1,:) = [] ;
global in_SG = data(1:in_LG,1:3);%граничные точки
global in_YG = data(1:in_LG,4);%значения в граничных точках
data(1:in_LG,:) = [] ;

global in_u_ind = data(1,1);%индекс функци u
data(1,:) = [] ;

global in_M = data(1,1);%кол-во моделирующих точек внутри области
data(1,:) = [] ;
global in_Sm = data(1:in_M,1:3);%моделирующие точки внутри области
data(1:in_M,:) = [] ;

global in_M0 = data(1,1);%кол-во моделирующих начальные условия точек
data(1,:) = [] ;
global in_Sm0 = data(1:in_M0,1:3);%моделирующие начальные условия точки
data(1:in_M0,:) = [] ;

global in_MG = data(1,1);%кол-во моделирующих граничные условия точек
data(1,:) = [] ;
global in_SmG = data(1:in_MG,1:3);%моделирующие граничные условия точки
data(1:in_MG,:) = [] ;

global in_a1 = data(1,1);%первая граница по x1
data(1,:) = [] ;

global in_b1 = data(1,1);%вторая граница по x1
data(1,:) = [] ;

global in_a2 = data(1,1);%первая граница по x2
data(1,:) = [] ;

global in_b2 = data(1,1);%вторая граница по x2
data(1,:) = [] ;

global in_T = data(1,1);%граница по времени
data(1,:) = [] ;

global in_N_x1 = data(1,1);%разбиение по x1 для прорисочки графика
data(1,:) = [] ;

global in_N_x2 = data(1,1);%разбиение по x2 для прорисочки графика
data(1,:) = [] ;

global in_N_t = data(1,1);%разбиение по t для прорисочки графика
data(1,:) = [] ;

if in_G_ind==1
  function result = f_G(x1,x2,t)
     result = 0.*x1 ;
     result(exp(1)*t-sqrt(x1.^2+x2.^2) > 0) = (1./(2*pi*exp(1)*sqrt(exp(2)*t.^2-x1.^2-x2.^2)))(exp(1)*t-sqrt(x1.^2+x2.^2) > 0) ;
  endfunction
  if in_u_ind==1
    function result = f_u(x1,x2,t)
      result = 0.*x1 ;
      result(x1==x1) = 1 ;
    endfunction
    function result = real_f_y(x1,x2,t)
      result = t.*t/2 - x1.*x1 + x2.*x2 ;
    endfunction
  end
end
  
global Um = f_u(in_Sm(:,1),in_Sm(:,2),in_Sm(:,3)) ;

%in_S0(:,1)*ones(1,in_M) - ones(in_L0,1)*in_Sm(:,1)'
%вектор Y
Y = [in_Y0 - f_G(in_S0(:,1)*ones(1,in_M) - ones(in_L0,1)*in_Sm(:,1)',in_S0(:,2)*ones(1,in_M) - ones(in_L0,1)*in_Sm(:,2)',in_S0(:,3)*ones(1,in_M) - ones(in_L0,1)*in_Sm(:,3)')*Um ;
 in_YG - f_G(in_SG(:,1)*ones(1,in_M) - ones(in_LG,1)*in_Sm(:,1)',in_SG(:,2)*ones(1,in_M) - ones(in_LG,1)*in_Sm(:,2)',in_SG(:,3)*ones(1,in_M) - ones(in_LG,1)*in_Sm(:,3)')*Um] ;

%вектор матрица А
A = [(f_G(in_S0(:,1)*ones(1,in_M0) - ones(in_L0,1)*in_Sm0(:,1)',in_S0(:,2)*ones(1,in_M0) - ones(in_L0,1)*in_Sm0(:,2)',in_S0(:,3)*ones(1,in_M0) - ones(in_L0,1)*in_Sm0(:,3)')) (f_G(in_S0(:,1)*ones(1,in_MG) - ones(in_L0,1)*in_SmG(:,1)',in_S0(:,2)*ones(1,in_MG) - ones(in_L0,1)*in_SmG(:,2)',in_S0(:,3)*ones(1,in_MG) - ones(in_L0,1)*in_SmG(:,3)'));
(f_G(in_SG(:,1)*ones(1,in_M0) - ones(in_LG,1)*in_Sm0(:,1)',in_SG(:,2)*ones(1,in_M0) - ones(in_LG,1)*in_Sm0(:,2)',in_SG(:,3)*ones(1,in_M0) - ones(in_LG,1)*in_Sm0(:,3)')) (f_G(in_SG(:,1)*ones(1,in_MG) - ones(in_LG,1)*in_SmG(:,1)',in_SG(:,2)*ones(1,in_MG) - ones(in_LG,1)*in_SmG(:,2)',in_SG(:,3)*ones(1,in_MG) - ones(in_LG,1)*in_SmG(:,3)'))] ;

%вектор U
U = pinv(A)*Y;

%коефициенты для моделирующих начальные условия точки
global U0 = U(1:in_M0);
%коефициенты для моделирующих граничные
global UG = U((in_M0+1):(in_M0+in_MG));

function result = f_y(x1,x2,t)
    global in_M ;
    global in_Sm ;
    global Um ;
    global in_M0 ;
    global in_Sm0 ;
    global U0 ;
    global in_MG ;
    global in_SmG ;
    global UG ;
    result = f_G(x1*ones(1,in_M) - ones(size(x1))*in_Sm(:,1)',x2*ones(1,in_M) - ones(size(x2))*in_Sm(:,2)',t*ones(1,in_M) - ones(size(t))*in_Sm(:,3)')*Um + f_G(x1*ones(1,in_M0) - ones(size(x1))*in_Sm0(:,1)',x2*ones(1,in_M0) - ones(size(x2))*in_Sm0(:,2)',t*ones(1,in_M0) - ones(size(t))*in_Sm0(:,3)')*U0 + f_G(x1*ones(1,in_MG) - ones(size(x1))*in_SmG(:,1)',x2*ones(1,in_MG) - ones(size(x2))*in_SmG(:,2)',t*ones(1,in_MG) - ones(size(t))*in_SmG(:,3)')*UG ;
endfunction

x = linspace(in_a1,in_b1,in_N_x1+1) ;
RESULT = [] ;
real_RESULT = [] ;
for t=linspace(0,in_T,in_N_t+1)
  for y = linspace(in_a2,in_b2,in_N_x2+1) ;
    RESULT(end+1,:) = f_y(x',y*ones(in_N_x1+1,1),t*ones(in_N_x1+1,1))' ;
    real_RESULT(end+1,:) = real_f_y(x',y*ones(in_N_x1+1,1),t*ones(in_N_x1+1,1))' ;
  end
end

[X,Y] = meshgrid(linspace(in_a1,in_b1,in_N_x1+1),linspace(in_a2,in_b2,in_N_x2+1));
temp = RESULT((end-in_N_x2):end,:) ;
%figure ;
%surf(X,Y,temp) ;
%figure ;
temp = real_RESULT((end-in_N_x2):end,:) ;
%surf(X,Y,temp) ;

diff_L0 = f_y(in_S0(:,1),in_S0(:,2),in_S0(:,3)) - in_Y0 ;
diff_LG = f_y(in_SG(:,1),in_SG(:,2),in_SG(:,3)) - in_YG ;
diff_result = diff_L0'*diff_L0+ diff_LG'*diff_LG ;

real_diff_L0 = real_f_y(in_S0(:,1),in_S0(:,2),in_S0(:,3)) - in_Y0 ;
real_diff_LG = real_f_y(in_SG(:,1),in_SG(:,2),in_SG(:,3)) - in_YG ;
real_diff_result = real_diff_L0'*real_diff_L0+ real_diff_LG'*real_diff_LG;
fileID = fopen('./cpp/out.txt','w');
fprintf(fileID,'%g\r\n',in_N_x1);
fprintf(fileID,'%g\r\n',in_N_x2);
fprintf(fileID,'%g\r\n',in_N_t);
for ii = 1:size(RESULT,1)
    fprintf(fileID,'%g\t',RESULT(ii,:));
    fprintf(fileID,'\r\n');
end
fprintf(fileID,'%g\r\n',diff_result);
fclose(fileID);