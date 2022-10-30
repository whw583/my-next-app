import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type StudentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerStudent = {
  readonly id: string;
  readonly name?: string | null;
  readonly sex?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStudent = {
  readonly id: string;
  readonly name?: string | null;
  readonly sex?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Student = LazyLoading extends LazyLoadingDisabled ? EagerStudent : LazyStudent

export declare const Student: (new (init: ModelInit<Student, StudentMetaData>) => Student) & {
  copyOf(source: Student, mutator: (draft: MutableModel<Student, StudentMetaData>) => MutableModel<Student, StudentMetaData> | void): Student;
}