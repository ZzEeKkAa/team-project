cmake_minimum_required(VERSION 3.7)
project(mmcore)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_MAIN_FILES main.cpp program.h program.cpp matrix.h matrix.cpp functions.h)
set(SOURCE_F_VAL_FILES f_val.cpp functions.h)
set(SOURCE_F_VALS_FILES f_vals.cpp functions.h)
add_executable(solve ${SOURCE_MAIN_FILES})
add_executable(fval ${SOURCE_F_VAL_FILES})
add_executable(fvals ${SOURCE_F_VALS_FILES})