import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { QueryExecResult } from "sql.js";
import {
  DbColumnAttribute,
  DbTable,
  DbColumnAttributeRef,
} from "../../assets/databases/databases";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { Task, tasksList } from "../../assets/tasks/tasks";
import { Button } from "../../components/Button/Button";
import { Chip } from "../../components/Chip/Chip";
import { ChipTooltip } from "../../components/ChipTooltip/ChipTooltip";
import { Dialog } from "../../components/Dialog/Dialog";
import { ModalButton } from "../../components/ModalButton/ModalButton";
import { Table } from "../../components/Table/Table";
import { Tabs } from "../../components/TabSelector/Tabs";
import { TextArea, TextAreaStatus } from "../../components/TextArea/TextArea";
import { SolutionStatus } from "../../store/reducers/solutionsReducer";
import { ExpectedQueryResults } from "../ExpectedQueryResults/ExpectedQueryResults";
import { UserQueryResults } from "../UserQueryResults/UserQueryResults";

interface SolutionEditorProps {
  readonly selectedTask: Task["id"] | null;
  readonly taskTables: DbTable[];
  readonly expectedTable: QueryExecResult[] | null;
  readonly userResultTable: QueryExecResult[] | null;
  readonly status: SolutionStatus;
  readonly onAnswerCheck: () => void;
  readonly textAreaValue: string;
  readonly onChangeTextArea: (value: string) => void;
  readonly onSelectNextTask: () => void;
  errorDetails?: string | null; // ✅ Nouvelle prop
}

interface ChipAttributeProps {
  readonly attr: DbColumnAttribute;
}

interface FKTooltipProps {
  readonly reference: DbColumnAttributeRef;
}

interface TaskDescriptionProps {
  task: Task | null;
}

interface StructureTablesProps {
  taskTables: DbTable[];
  onClose?: () => void;
  className?: string;
}

interface TaskTextareaProps {
  status: SolutionStatus;
  value: string;
  onChangeValue: (text: string) => void;
}

interface SolutionButtonsProps {
  expectedTable: QueryExecResult[] | null;
  userResultTable: QueryExecResult[] | null;
  onAnswerCheck: () => void;
  status: SolutionStatus;
  onSelectNextTask: () => void;
  isLastIndex: boolean;
  // ✅ Ajouter cette nouvelle prop
  errorDetails?: string | null;
}

interface ExpectedResultFrameProps {
  onClose: () => void;
  expectedTable: QueryExecResult[] | null;
  userResultTable: QueryExecResult[] | null;
}

function PKTooltip() {
  const { t } = useTranslation();

  return (
    <span className="whitespace-nowrap text-p-md font-semibold text-gray-100">
      {t("primary_key")}
    </span>
  );
}

function FKTooltip({ reference }: FKTooltipProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <span className="pb-2 whitespace-nowrap text-p-md font-semibold text-gray-100">
        {t("foreign_key_to")}
      </span>
      <div className="pb-1.5 flex flex-row gap-1">
        <span className="text-sub text-gray-300">
          {t("foreign_key_to_table")}
        </span>
        <span className="text-sub text-gray-50">{reference.table}</span>
      </div>
      <div className="flex flex-row gap-1">
        <span className="text-sub text-gray-300">
          {t("foreign_key_to_column")}
        </span>
        <span className="text-sub text-gray-50">{reference.column}</span>
      </div>
    </div>
  );
}

function ChipAttribute({ attr }: ChipAttributeProps) {
  const { t } = useTranslation();

  const { type, reference } = attr;

  const Tooltip =
    type === "PK" || !reference ? (
      <PKTooltip />
    ) : (
      <FKTooltip reference={reference} />
    );

  return (
    <ChipTooltip
      key={type}
      style="lightblue"
      aria-label={t("column_property")}
      delay={0}
      tooltip={Tooltip}
    >
      {type}
    </ChipTooltip>
  );
}

function TaskDescription({ task }: Readonly<TaskDescriptionProps>) {
  const { t } = useTranslation();

  return (
    <>
      {task && (
        <>
          <span className="mb-2 font-semibold text-p-lg text-gray-1000 dark:text-gray-200">
            {t(`topics.${task.topic}`)}
          </span>
          <span className="mb-6 text-p-lg text-gray-900 dark:text-gray-100">
            {t(`tasks.${task.id}`)}
          </span>
        </>
      )}
      {!task && (
        <>
          <div className="w-[50%] h-[20px] mb-3 bg-gray-200 rounded-[100px]" />
          <div className="w-full h-[14px] mb-2 bg-gray-200 rounded-[100px]" />
          <div className="w-full h-[14px] mb-2 bg-gray-200 rounded-[100px]" />
          <div className="w-[70%] h-[14px] mb-6 bg-gray-200 rounded-[100px]" />
        </>
      )}
    </>
  );
}

function SkeletonTable() {
  return (
    <Table
      className="w-full max-w-[390px]"
      header={[<div key="skeleton-header" className="w-[210px] h-4 bg-gray-200 rounded-[100px]" />]}
      data={[
        [<div key="skeleton-row-0" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-1" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-2" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-3" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-4" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-5" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-6" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-7" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-8" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-9" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
        [<div key="skeleton-row-10" className="w-[340px] h-3 bg-gray-200 rounded-[100px]" />],
      ]}
    />
  );
}

function StructureTables({
  taskTables,
  onClose,
  className = "",
}: Readonly<StructureTablesProps>) {
  const { t } = useTranslation();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scroll({ top: 0 });
  }, [taskTables]);

  return (
    <div
      className={`flex flex-col px-6 pb-6 md:pb-0 w-full md:h-full ${className}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex flex-row py-6 items-center justify-between">
          <div className="flex flex-row gap-2">
            <span className="text-p-lg font-bold text-gray-900 dark:text-gray-200">
              {t("tables_description")}
            </span>
            <Chip style="white" aria-label={t("amount_of_tables")}>
              {taskTables.length}
            </Chip>
          </div>
          {onClose && (
            <Button
              variant="text"
              size="big"
              leftIcon={<CloseIcon />}
              className="!p-0"
              onPress={onClose}
            />
          )}
        </div>
        <div
          ref={scrollRef}
          className="items-center md:pb-6 h-full overflow-y-auto"
        >
          <div className="w-full flex flex-col gap-3 pr-3 items-center">
            {taskTables?.map(({ name, columns }) => (
              <Table
                className="w-full max-w-[390px]"
                key={name}
                header={[name]}
                data={
                  columns?.map(({ name, attributes }) => [
                    <div key={name} className="flex flex-row justify-between">
                      <span>{name}</span>
                      <div className="flex flex-row gap-2">
                        {attributes.map((attr) => (
                          <ChipAttribute key={attr.type} attr={attr} />
                        ))}
                      </div>
                    </div>,
                  ]) || []
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskTextarea({ status, value, onChangeValue }: Readonly<TaskTextareaProps>) {
  const { t } = useTranslation();

  let textAreaStatus: TextAreaStatus;
  let textAreaDescription: string | undefined = undefined;
  switch (status) {
    case "UNKNOWN":
    case "PROCESSING": {
      textAreaStatus = "DEFAULT";
      break;
    }
    case "CORRECT": {
      textAreaStatus = "SUCCESS";
      textAreaDescription = t("correct_answer") || undefined;
      break;
    }
    case "INCORRECT": {
      textAreaStatus = "FAIL";
      textAreaDescription = t("incorrect_answer") || undefined;
      break;
    }
  }

  return (
    <TextArea
      label={t("sql_textarea_label")}
      placeholder={t("sql_textarea_placeholder") || undefined}
      className="mb-4 h-full max-h-[580px]"
      status={textAreaStatus}
      statusDescription={textAreaDescription}
      value={value}
      onChange={onChangeValue}
    />
  );
}

function ExpectedResultFrame({
  onClose,
  expectedTable,
  userResultTable,
}: Readonly<ExpectedResultFrameProps>) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full h-[85vh]">
      <div className="relative flex flex-row w-full justify-between items-center py-2 px-6">
        <span className="text-gray-900 dark:text-gray-200 text-h5 font-bold">
          {t("outputs")}
        </span>
        <Button
          size="big"
          variant="text"
          leftIcon={<CloseIcon />}
          onPress={onClose}
        />
        <div className="absolute left-[-100vw] bottom-0 w-[200vw] border-b border-solid border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="md:hidden flex flex-col px-6 py-4 h-[calc(100%-64px)]">
        <Tabs className="h-full">
          <Item key="userQuery" title={t("your_outputs")}>
            <UserQueryResults table={userResultTable} />
          </Item>
          <Item key="expectedQuery" title={t("expected_output")}>
            <ExpectedQueryResults table={expectedTable} />
          </Item>
        </Tabs>
      </div>
      <div className="hidden md:flex flex-row pt-6 pb-10 px-6 gap-6 h-[calc(100%-64px)]">
        <div className="flex flex-col w-[calc(50%-0.75rem)]">
          <span className="text-gray-900 dark:text-gray-200 text-p-lg font-bold mb-4">
            {t("your_outputs")}
          </span>
          <UserQueryResults table={userResultTable} />
        </div>
        <div className="flex flex-col w-[calc(50%-0.75rem)]">
          <span className="text-gray-900 dark:text-gray-200 text-p-lg font-bold mb-4">
            {t("expected_output")}
          </span>
          <ExpectedQueryResults table={expectedTable} />
        </div>
      </div>
    </div>
  );
}

function SolutionButtons({
  expectedTable,
  userResultTable,
  onAnswerCheck,
  status,
  onSelectNextTask,
  isLastIndex,
  errorDetails,
}: Readonly<SolutionButtonsProps>) {
  const { t } = useTranslation();
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <ModalButton
        buttonProps={{
          variant: "tertiary",
          size: "big",
          fill: "fillContainer",
          className: "px-3",
          children: t("show_expected_result"),
        }}
        isDismissable={true}
        position="bottomFullWidth"
      >
        {(onClose) => (
          <Dialog>
            <ExpectedResultFrame
              onClose={onClose}
              expectedTable={expectedTable}
              userResultTable={userResultTable}
            />
          </Dialog>
        )}
      </ModalButton>
      {(status === "UNKNOWN" || status === "PROCESSING") && (
        <Button
          variant="primary"
          size="big"
          fill="fillContainer"
          onPress={onAnswerCheck}
          isDisabled={status === "PROCESSING"}
        >
          {t("check_answer")}
        </Button>
      )}
      {status === "CORRECT" && (
        <Button
          variant="primary"
          size="big"
          fill="fillContainer"
          onPress={onSelectNextTask}
          isDisabled={isLastIndex}
          className="!bg-green-600 hover:!bg-green-700 active:!bg-green-800"
        >
          {t("next_task")}
        </Button>
      )}
      {/* Bouton pour afficher les détails d'erreur */}
      {status === "INCORRECT" && (
        <>
          <Button
            variant="secondary"
            size="big"
            fill="fillContainer"
            onPress={() => setShowErrorDetails(true)}
            className="!bg-red-100 hover:!bg-red-200 dark:!bg-red-900 dark:hover:!bg-red-800"
          >
            {t("error_info")}
          </Button>
          {showErrorDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-lg w-full border border-red-200 dark:border-red-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-red-700 dark:text-red-200">
                    {t("error_info")}
                  </h2>
                  <Button
                    variant="text"
                    size="big"
                    onPress={() => setShowErrorDetails(false)}
                  >
                    ✕
                  </Button>
                </div>
                <pre className="text-sm text-red-800 dark:text-red-200 whitespace-pre-wrap">
                  {errorDetails || t("no_error_details")}
                </pre>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function SolutionEditor({
  selectedTask,
  taskTables,
  expectedTable,
  userResultTable,
  status,
  onAnswerCheck,
  textAreaValue,
  onChangeTextArea,
  onSelectNextTask,
  errorDetails, // ✅ Nouvelle prop
}: Readonly<SolutionEditorProps>) {
  const { t } = useTranslation();

  const taskIndex = tasksList.findIndex((task) => task.id === selectedTask);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row flex-1 gap-6">
        <div className="flex flex-col flex-1">
          <div className="hidden md:flex flex-col">
            <div className="flex flex-row py-6 items-center justify-between">
              <div className="flex flex-row gap-2">
                <span className="text-p-lg font-bold text-gray-900 dark:text-gray-200">
                  {t("tables_description")}
                </span>
                <Chip style="white" aria-label={t("amount_of_tables")}>
                  {taskTables.length}
                </Chip>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {taskTables?.map(({ name, columns }) => (
                <Table
                  className="w-full max-w-[390px]"
                  key={name}
                  header={[name]}
                  data={
                    columns?.map(({ name, attributes }) => [
                      <div key={name} className="flex flex-row justify-between">
                        <span>{name}</span>
                        <div className="flex flex-row gap-2">
                          {attributes.map((attr) => (
                            <ChipAttribute key={attr.type} attr={attr} />
                          ))}
                        </div>
                      </div>,
                    ]) || []
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <TaskDescription task={selectedTask ? tasksList[taskIndex] : null} />
            <TaskTextarea
              status={status}
              value={textAreaValue}
              onChangeValue={onChangeTextArea}
            />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[390px]">
          <div className="flex flex-row py-6 items-center justify-between">
            <span className="text-p-lg font-bold text-gray-900 dark:text-gray-200">
              {t("outputs")}
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <UserQueryResults table={userResultTable} />
          </div>
        </div>
      </div>
      <SolutionButtons
        expectedTable={expectedTable}
        userResultTable={userResultTable}
        onAnswerCheck={onAnswerCheck}
        status={status}
        onSelectNextTask={onSelectNextTask}
        isLastIndex={taskIndex === tasksList.length - 1}
        errorDetails={errorDetails} // ✅ Passer les détails d'erreur
      />
    </div>
  );
}