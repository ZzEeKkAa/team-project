#pragma once
#include <fstream>
#include <vector>
#include "matrix.h"
using namespace std;


class Program
{
public:
	Program(ifstream&, ofstream&);
private:
	void algo(ifstream&, ofstream&);
	void read_info(ifstream&);
	int num_g_f;                  // номер функции √рина

	int L0;
	int LG;

	vector<vector<double>> cond_0;  // вектор начальних условий, типо y((1,2,0))=3 ,L0
	vector<vector<double>> cond_L;  // вектор краевых условий, типо y((1,2,0))=3  , LG

	int indx_u;         //индекс функции u(s)(дл€ данной функции √рина!)

	int M;   //кол-во модулирующих точек в области
	vector<vector<double>> s_M;

	int M0;  //кол-во точек моделирующих начальные услови€
	vector<vector<double>> s_M0;

	int MG;  //кол-во точек моделирующих краевыеуслови€
	vector<vector<double>> s_MG;

	vector<double> x1_intr;  // a_1<=x_1<=b_1
	vector<double> x2_intr;  // a_2<=x_2<=b_2
	vector<double> t_intr;   // 0<=t<=T

	int N_x1;  // количество интервалов сетки по х1
	int N_x2;  // количество интервалов сетки по х2
	int N_t;   // количество интервалов сетки по t

	vector<double> x1_s;    // сетка дл€ х1
	vector<double> x2_s;   // сетка дл€ х2
	vector<double> t_s;     // сетка дл€ t


	void make_matrix();

	double G(vector<double>, vector<double>);

	double Heaviside_func(double);

	double u(vector<double>);

	vector<vector<double>> A_;
	Matrix A;

	void make_Y();
	void find_U();

	vector<double> Y;
	vector<double> U;

	double y(vector<double>);  // y(s)

	double y_inf(vector<double>);  // y_inf(s)
	double y0(vector<double>);  // y0(s)
	double yL(vector<double>);  // yL(s)

	void write_out_result(ofstream&);

};
