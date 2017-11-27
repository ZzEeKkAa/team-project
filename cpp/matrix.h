#pragma once
#include <vector>
using namespace std;


class Matrix
{
public:
	Matrix()
	{
		m_ = { {} };
	}
	Matrix(int N)
	{
		vector<double> c;
		for (int i = 0; i < N; ++i)
			c.push_back(0.0);
		for (int j = 0; j < N; ++j)
			m_.push_back(c);

	}
	Matrix(vector<vector<double>> m_0)
	{
		m_ = m_0;

	}
	Matrix(const Matrix& a)
	{

		m_ = a.m_;

	}
	vector<double>& operator[](int i)
	{
		return m_[i];
	}
	Matrix& operator=(const Matrix& a)
	{

		m_ = a.m_;
		return *this;
	}
	int	get_size_raw()
	{
		return m_.size();
	}

	int	get_size_coll()
	{
		return m_[0].size();
	}

	void add_raw(vector<double>);

	void display_matrix();

	void fill_matrix(int);
private:
	vector<vector<double>> m_;

};

Matrix operator*(Matrix, Matrix);
vector<double> operator*(Matrix, vector<double>);
Matrix operator+(Matrix, vector<double>);
vector<double> operator+(vector<double>, vector<double>);
vector<double> operator-(vector<double>, vector<double>);
double Norm_of_vector(vector<double>);
double det(Matrix);
Matrix inverse(Matrix);
void fill_vector(vector<double>&, int);

Matrix transpose(Matrix);
