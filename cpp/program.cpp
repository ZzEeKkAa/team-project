#include "program.h"
#define _USE_MATH_DEFINES

#include <math.h>
#include <iostream>

#include "functions.h"

Program::Program(ifstream& ifs, ofstream& ofs)
{
    algo(ifs,ofs);
}

void Program::algo(ifstream& ifs, ofstream& ofs)
{
    read_info(ifs);
    make_matrix();
    make_Y();
    find_U();
    write_out_result(ofs);
}

void Program::read_info(ifstream& ifs)
{

    ifs >> num_g_f;

    int n, n1;

    ifs >> n;

    L0 = n;

    vector<double> v;

    for (int i = 0; i < n; ++i)
        cond_0.push_back(v);



    for(int i=0;i<n;++i)
    {
        for (int j = 0; j < 4; ++j)
        {
            ifs >> n1;
            cond_0[i].push_back(double(n1));
        }
    }

    ifs >> n;

    LG = n;



    for (int i = 0; i < n; ++i)
        cond_L.push_back(v);

    for (int i = 0; i<n; ++i)
    {
        for (int j = 0; j < 4; ++j)
        {
            ifs >> n1;
            cond_L[i].push_back(double(n1));
        }
    }

    ifs >> indx_u;

    ifs >> M;



    for (int i = 0; i < M; ++i)
        s_M.push_back(v);

    for (int i = 0; i<M; ++i)
    {
        for (int j = 0; j < 3; ++j)
        {
            ifs >> n1;
            s_M[i].push_back(double(n1));
        }
    }

    ifs >> M0;


    for (int i = 0; i < M0; ++i)
        s_M0.push_back(v);
    for (int i = 0; i<M0; ++i)
    {
        for (int j = 0; j < 3; ++j)
        {
            ifs >> n1;
            s_M0[i].push_back(double(n1));
        }
    }

    ifs >> MG;


    for (int i = 0; i < MG; ++i)
        s_MG.push_back(v);
    for (int i = 0; i<MG; ++i)
    {
        for (int j = 0; j < 3; ++j)
        {
            ifs >> n1;
            s_MG[i].push_back(double(n1));
        }
    }

    ifs >> n;
    x1_intr.push_back(double(n1));
    ifs >> n;
    x1_intr.push_back(double(n1));


    ifs >> n;
    x2_intr.push_back(double(n1));
    ifs >> n;
    x2_intr.push_back(double(n1));

    t_intr.push_back(0.0);
    ifs >> n;
    t_intr.push_back(double(n1));

    ifs >> n;
    N_x1= n;

    ifs >> n;
    N_x2 = n;

    ifs >> n;
    N_t = n;

    int x_,h;

    h = (x1_intr[1] - x1_intr[0]) / N_x1;

    for (int i = 0;i <= N_x1; ++i)
    {
        x_ = x1_intr[0] + i*h;
        x1_s.push_back(x_);
    }



    h = (x2_intr[1] - x2_intr[0]) / N_x2;

    for (int i = 0; i <= N_x2; ++i)
    {
        x_ = x2_intr[0] + i*h;
        x2_s.push_back(x_);
    }


    h = (t_intr[1] - t_intr[0]) / N_t;

    for (int i = 0; i <= N_t; ++i)
    {
        x_ = t_intr[0] + i*h;
        t_s.push_back(x_);
    }


}

void Program::make_matrix()
{
    vector<double> v;

    for (int i = 0; i < L0 + LG; ++i)
        A_.push_back(v);

    for (int i = 0; i < L0 + LG; ++i)
        for (int j = 0; j < M0 + MG; ++j)
            A_[i].push_back(0.0);

    // A11
    for (int i = 0; i < L0; ++i)
    {
        for (int j = 0; j < M0; ++j)
        {
            A_[i][j] = G(cond_0[i], s_M0[j]);
        }
    }

    // A12
    for (int i = 0; i < L0; ++i)
    {
        for (int j = 0; j < MG; ++j)
        {
            A_[i][j+M0] = G(cond_0[i], s_MG[j]);
        }
    }

    // A21
    for (int i = 0; i < LG; ++i)
    {
        for (int j = 0; j < M0; ++j)
        {
            A_[i+L0][j] = G(cond_L[i], s_M0[j]);
        }
    }

    // A22
    for (int i = 0; i < LG; ++i)
    {
        for (int j = 0; j < MG; ++j)
        {
            A_[i+L0][j+M0] = G(cond_L[i], s_MG[j]);
        }
    }

    A = Matrix(A_);

    A.display_matrix();
}

double Program::G(vector<double> s, vector<double> s_)
{
    return funcs::G(s[0]-s_[0],s[1]-s_[1],s[2]-s_[2]);
}

double Program::Heaviside_func(double x)
{
    if (x >= 0.0) return 1.0;
    else return 0.0;
}

void Program::make_Y()
{
    std::cout <<"make_Y"<<std::endl;
    for (int i = 0; i < L0 + LG; ++i)
        Y.push_back(0.0);

    for (int i = 0; i < L0; ++i)
        Y[i] = cond_0[i][3]-y_inf(cond_0[i]);


    for (int i = 0; i < LG; ++i)
        Y[i+L0] = cond_L[i][3]- y_inf(cond_L[i]);

//	for (int i = 0; i < Y.size(); ++i)
//    	cout << Y[i] << endl;

}
void Program::find_U()
{


    Matrix S = inverse(transpose(A)*A)*transpose(A);

    U = S*Y;

    //	for (int i = 0; i < U.size(); ++i)
    //	cout << U[i] << endl;

}

double Program::y_inf(vector<double> s)
{
    double sum = 0.0;

    for (int i = 0; i < M; ++i)
    {
        sum = sum + G(s, s_M[i])*u(s_M[i]);
    }

    return sum;

}

double Program::u(vector<double> s)
{
    return funcs::u(s[0],s[1],s[2]);
}

double Program::y0(vector<double> s)
{

    double sum = 0.0;

    for (int i = 0; i < M0; ++i)
    {
        sum = sum + G(s, s_M0[i])*U[i];
    }

    return sum;
}
double Program::yL(vector<double> s)
{

    double sum = 0.0;

    for (int i = 0; i < MG; ++i)
    {
        sum = sum + G(s, s_MG[i])*U[M0+i];
    }

    return sum;
}

double Program::y(vector<double> s)
{
    return y_inf(s) + y0(s) + yL(s);
}

void Program::write_out_result(ofstream& ofs)
{
    vector<double> s;
    s.push_back(0.0);
    s.push_back(0.0);
    s.push_back(0.0);

    double h1 = (x1_intr[1] - x1_intr[0]) / N_x1;
    double	h2= (x2_intr[1] - x2_intr[0]) / N_x2;
    double h3= (t_intr[1] - t_intr[0]) / N_t;

    for(int i=0;i<N_x1;++i)
        for(int j=0;j<N_x2;++j)
            for (int k = 0; k < N_t; ++k)
            {
                s[0] = x1_intr[0] + i*h1;
                s[1]= x2_intr[0] + i*h2;
                s[2]= t_intr[0] + i*h3;

                ofs << y(s) << endl;
            }

}
