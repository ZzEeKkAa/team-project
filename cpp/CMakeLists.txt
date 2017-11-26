cmake_minimum_required(VERSION 3.7)
project(mmcore)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_MAIN_FILES main.cpp functions.h)
set(SOURCE_F_VAL_FILES f_val.cpp functions.h)
add_executable(mmcore ${SOURCE_MAIN_FILES})
add_executable(fval ${SOURCE_F_VAL_FILES})