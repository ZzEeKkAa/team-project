#include "matrix.h"
#include <stdlib.h>  
#include <iostream>

Matrix operator*(Matrix A, Matrix B)   // Only square matrices
{
	//Matrix C(A.get_size_raw());

	int M = A.get_size_raw();
	int N = B.get_size_coll();

	vector <vector<double>> c;

	vector<double> v;

	for (int i = 0; i <M; ++i)
		c.push_back(v);

	for (int i = 0; i < M; ++i)
		for (int j = 0; j < N; ++j)
			c[i].push_back(0.0);

	Matrix C(c);

	double sum = 0.0;

	for (int i = 0; i < M; ++i)
	{
		for (int j = 0; j < N; ++j)
		{
			sum = 0.0;
			for (int k = 0; k < A.get_size_coll(); ++k)
				sum = sum + A[i][k] * B[k][j];
			C[i][j] = sum;
		}
	}
	return C;
}

void Matrix::display_matrix()
{

	for (int i = 0; i <= get_size_raw() - 1; ++i)
	{
		for (int j = 0; j <= get_size_coll() - 1; ++j)
		{
			cout << m_[i][j] << "  ";
		}
		cout << endl;
	}
}

double det(Matrix A)
{
	double product, m;
	for (int k = 0; k < A.get_size_raw() - 1; k++)
	{
		for (int i = k + 1; i < A.get_size_raw(); i++)
		{
			m = A[i][k] / A[k][k];
			for (int j = 0; j < A.get_size_raw(); j++)
			{
				A[i][j] -= m*A[k][j];
			}
		}
	}

	product = 1;
	for (int i = 0; i < A.get_size_raw(); i++)
		product *= A[i][i];

	return product;
}

Matrix inverse(Matrix A)
{
	int N = A.get_size_raw();

	Matrix B(N);
	Matrix X(N);

	for (int i = 0; i < N; i++)
		B[i][i] = 1;

	double Sum, m;
	for (int k = 0; k <= N - 2; k++)
		for (int i = k + 1; i <= N - 1; i++)
		{
			m = A[i][k] / A[k][k];
			for (int j = 0; j <= N - 1; j++)
			{
				A[i][j] -= m*A[k][j];
				B[i][j] -= m*B[k][j];
			}
		}

	for (int i = N - 1; i >= 0; i--)
		for (int j = 0; j <= N - 1; j++)
		{
			Sum = 0;
			for (int k = i + 1; k <= N - 1; k++)
				Sum += A[i][k] * X[k][j];
			X[i][j] = (B[i][j] - Sum) / A[i][i];
		}
	return X;
}

void Matrix::add_raw(vector<double> a)
{
	m_.push_back(a);
}

vector<double> operator*(Matrix A, vector<double> b)
{
	int M = A.get_size_raw();
	int N = A.get_size_coll();

	double sum;

	vector<double> res = vector<double>(M);

	for (int i = 0; i <= M - 1; ++i)
	{
		sum = 0.0;
		for (int j = 0; j <= N - 1; ++j)
			sum = sum + A[i][j] * b[j];
		res[i] = sum;
	}
	return res;
}

Matrix operator+(Matrix A, vector<double> b)
{
	int N = A.get_size_raw();
	Matrix res = A;

	for (int i = 0; i <= N - 1; ++i)
	{
		res[i][0] = res[i][0] + b[i];
	}

	return res;
}

vector<double> operator+(vector<double> a, vector<double> b)
{
	int N = a.size();
	vector<double> res = vector<double>(N);

	for (int i = 0; i <= N - 1; ++i)
		res[i] = a[i] + b[i];

	return res;
}


double Norm_of_vector(vector<double> b)
{
	double norm;

	norm = abs(b[0]);
	for (int i = 1; i < b.size(); ++i)
		if (abs(b[i]) > norm)
			norm = abs(b[i]);

	return norm;
}

vector<double> operator-(vector<double> a, vector<double> b)
{
	int N = a.size();
	vector<double> res = vector<double>(N);

	for (int i = 0; i <= N - 1; ++i)
		res[i] = a[i] - b[i];

	return res;
}

void fill_vector(vector<double>& v, int N)
{
	for (int i = 0; i <= N - 1; ++i)
		v.push_back(0.0);
}

Matrix transpose(Matrix A)
{
	int M = A.get_size_raw();
	int N = A.get_size_coll();

	vector<vector<double>> s;



	vector<double> v;
	for (int i = 0; i < N; ++i)
		s.push_back(v);

	for (int i = 0; i < N; ++i)
		for (int j = 0; j < M; ++j)
			s[i].push_back(0.0);

	Matrix S(s);

	for (int i = 0; i <= N - 1; ++i)
		for (int j = 0; j <= M - 1; ++j)
			S[i][j] = A[j][i];

	return S;
}

void Matrix::fill_matrix(int N)
{
	vector<double> c;
	for (int i = 0; i < N; ++i)
		c.push_back(0.0);
	for (int j = 0; j < N; ++j)
		m_.push_back(c);
}
