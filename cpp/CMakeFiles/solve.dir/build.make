# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.9

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp

# Include any dependencies generated for this target.
include CMakeFiles/solve.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/solve.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/solve.dir/flags.make

CMakeFiles/solve.dir/main.cpp.o: CMakeFiles/solve.dir/flags.make
CMakeFiles/solve.dir/main.cpp.o: main.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/solve.dir/main.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/solve.dir/main.cpp.o -c /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/main.cpp

CMakeFiles/solve.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/solve.dir/main.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/main.cpp > CMakeFiles/solve.dir/main.cpp.i

CMakeFiles/solve.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/solve.dir/main.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/main.cpp -o CMakeFiles/solve.dir/main.cpp.s

CMakeFiles/solve.dir/main.cpp.o.requires:

.PHONY : CMakeFiles/solve.dir/main.cpp.o.requires

CMakeFiles/solve.dir/main.cpp.o.provides: CMakeFiles/solve.dir/main.cpp.o.requires
	$(MAKE) -f CMakeFiles/solve.dir/build.make CMakeFiles/solve.dir/main.cpp.o.provides.build
.PHONY : CMakeFiles/solve.dir/main.cpp.o.provides

CMakeFiles/solve.dir/main.cpp.o.provides.build: CMakeFiles/solve.dir/main.cpp.o


CMakeFiles/solve.dir/program.cpp.o: CMakeFiles/solve.dir/flags.make
CMakeFiles/solve.dir/program.cpp.o: program.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/solve.dir/program.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/solve.dir/program.cpp.o -c /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/program.cpp

CMakeFiles/solve.dir/program.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/solve.dir/program.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/program.cpp > CMakeFiles/solve.dir/program.cpp.i

CMakeFiles/solve.dir/program.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/solve.dir/program.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/program.cpp -o CMakeFiles/solve.dir/program.cpp.s

CMakeFiles/solve.dir/program.cpp.o.requires:

.PHONY : CMakeFiles/solve.dir/program.cpp.o.requires

CMakeFiles/solve.dir/program.cpp.o.provides: CMakeFiles/solve.dir/program.cpp.o.requires
	$(MAKE) -f CMakeFiles/solve.dir/build.make CMakeFiles/solve.dir/program.cpp.o.provides.build
.PHONY : CMakeFiles/solve.dir/program.cpp.o.provides

CMakeFiles/solve.dir/program.cpp.o.provides.build: CMakeFiles/solve.dir/program.cpp.o


CMakeFiles/solve.dir/matrix.cpp.o: CMakeFiles/solve.dir/flags.make
CMakeFiles/solve.dir/matrix.cpp.o: matrix.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/solve.dir/matrix.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/solve.dir/matrix.cpp.o -c /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/matrix.cpp

CMakeFiles/solve.dir/matrix.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/solve.dir/matrix.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/matrix.cpp > CMakeFiles/solve.dir/matrix.cpp.i

CMakeFiles/solve.dir/matrix.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/solve.dir/matrix.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/matrix.cpp -o CMakeFiles/solve.dir/matrix.cpp.s

CMakeFiles/solve.dir/matrix.cpp.o.requires:

.PHONY : CMakeFiles/solve.dir/matrix.cpp.o.requires

CMakeFiles/solve.dir/matrix.cpp.o.provides: CMakeFiles/solve.dir/matrix.cpp.o.requires
	$(MAKE) -f CMakeFiles/solve.dir/build.make CMakeFiles/solve.dir/matrix.cpp.o.provides.build
.PHONY : CMakeFiles/solve.dir/matrix.cpp.o.provides

CMakeFiles/solve.dir/matrix.cpp.o.provides.build: CMakeFiles/solve.dir/matrix.cpp.o


# Object files for target solve
solve_OBJECTS = \
"CMakeFiles/solve.dir/main.cpp.o" \
"CMakeFiles/solve.dir/program.cpp.o" \
"CMakeFiles/solve.dir/matrix.cpp.o"

# External object files for target solve
solve_EXTERNAL_OBJECTS =

solve: CMakeFiles/solve.dir/main.cpp.o
solve: CMakeFiles/solve.dir/program.cpp.o
solve: CMakeFiles/solve.dir/matrix.cpp.o
solve: CMakeFiles/solve.dir/build.make
solve: CMakeFiles/solve.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Linking CXX executable solve"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/solve.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/solve.dir/build: solve

.PHONY : CMakeFiles/solve.dir/build

CMakeFiles/solve.dir/requires: CMakeFiles/solve.dir/main.cpp.o.requires
CMakeFiles/solve.dir/requires: CMakeFiles/solve.dir/program.cpp.o.requires
CMakeFiles/solve.dir/requires: CMakeFiles/solve.dir/matrix.cpp.o.requires

.PHONY : CMakeFiles/solve.dir/requires

CMakeFiles/solve.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/solve.dir/cmake_clean.cmake
.PHONY : CMakeFiles/solve.dir/clean

CMakeFiles/solve.dir/depend:
	cd /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp /home/zeka/go/src/github.com/ZzEeKkAa/team-project/cpp/CMakeFiles/solve.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/solve.dir/depend
