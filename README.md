#  Day 11 - Frontend boot camp

1. [Chapter I](#chapter-i) \
   1.1. [Typescript](#асинхронность-в-redux) \
   1.2. [Интерфейсы](#redux-thunk) \
   1.3. [Типы](#redux-saga) \
   1.3. [Дженерики](#redux-saga) 
2. [Chapter II](#chapter-ii) \
   2.1. [Webpack](#работа-с-формами) 

## Chapter I

В этой главе мы разберемся что такое Typescript и какие проблемы он решает, а также познакомимся со сборщиком модулей webpack.
 
  
### Typescript

[TypeScript](https://www.typescriptlang.org/docs/) – это компилируемое надмножество JavaScript, приносящее опциональную статическую типизацию и некоторые возможности современных стандартов ECMAScript.

Несмотря на то, что изначально мы пишем код на TypeScript, его нельзя выполнять непосредственно в браузере, как JS. Вместо этого итоговый код проходит через дополнительный шаг компиляции, в ходе которого преобразуется в распознаваемый браузером JS-эквивалент. Этот процесс еще называют транспиляция.

Так что, даже когда мы программируем на TS, конечная программа, выполняющаяся в браузере, будет в JS.

Надеюсь всем понятно, что статическая типизация отличается от динамической тем, что в первом случае проверка типов осуществляется во время компиляции, а во втором – во время выполнения инструкций. Однако, что же значит «опциональная типизация»? – всё очень просто: вы используете типы там, где вам хочется. Вы можете писать весь код типизированным, можете типизировать лишь его часть, а можете не использовать типы вообще, используя TypeScript лишь как транспилятор и наивный подсказчик в вашем редакторе. Наивным его называют потому, что TypeScript из коробки пытается определить тип переменных, возвращаемых значений функций и прочих конструкций и на основе этих определений подсказывать вам.

Помимо строгой статической типизации, TypeScript предоставляет множество возможностей, таких как Interfaces, Mixin классы, Enums и многие другие.

### Интерфейсы

Интерфейс определяет свойства и методы, которые объект должен реализовать. Другими словами, интерфейс - это определение кастомного типа данных, но без реализации. В данном случае интерфейсы в TS похожи на интерфейсы в языках Java и C#. Интерфейсы определяются с помощью ключевого слова [interface](./materials/Interfaces.md).

### Типы

TypeScript является строго типизированным языком, и каждая переменная и константа в нем имеет определенный тип. При этом в отличие от javascript мы не можем динамически изменить ранее указанный тип переменной.
Большинство из этих типов соотносятся с примитивными типами из JavaScript.

`-` boolean: логическое значение true или false. \
`-` number: числовое значение .\
`-` string: строки. \
`-` Array: массивы. \
`-` Кортежи. \
`-` Enum: перечисления. \
`-` Any: произвольный тип. \
`-` Symbol. \
`-` null и undefined: соответствуют значениям null и undefined в javascript. \
`-` Never: также представляет отсутствие значения и используется в качестве возвращаемого типа функций, которые генерируют или возвращают ошибку.

Все [типы в TypeScript](./materials/Types.md) являются подтипами главного типа, которым является тип Any. Тип Any — единственный, который может представлять любое значение JavaScript без всяких ограничений. Все остальные типы накладывают определенные ограничения на свои значения.

### Дженерики

Обобщения (англ. generics) или дженерики - это инструмент, который позволяет писать на TypeScript компоненты, способные работать с различными типами данных. Дженерик позволяет резервировать место для типа, который будет заменён на конкретный, переданный пользователем, при вызове функции или метода, а также при работе с классами. [Рассмотрим на примере](./materials/Generic_types.md).


**Упражнение 1.** 

У вас уже есть 2 готовых приложения - Сервис вакансий и Маркетплейс. Выбери одно из этих приложений и перепишите фронтенд часть на typescript. Запрещено использовать тип **any**!

## Chapter II

### Webpack

Webpack — это статический сборщик модулей. Его основная задача — пакетирование файлов JavaScript для использования в браузере, но он также способен преобразовывать, связывать и упаковывать практически любые ресурсы.

Webpack используется затем, чтобы собрать все зависимости, которые включают не только код, но и другие ресурсы, и создать граф зависимостей. Сборщик может работать только с JS-файлами, поэтому webpack должен предварительно обработать все остальные файлы и ресурсы, прежде чем они попадут в пакет.

```
App.js ->       |
Dashboard.js -> | Bundler | -> bundle.js
About.js ->     |
```

[Рассмотрим основные этапы настройки и работы webpack](./materials/Webpack.md)



**Упражнение 2.**  

Попробуйте реализовать простой todoList только с использование frontend. При этом нельзя использовать CRA, только самописный webpack config. [Рекомендации к выполнению задания](src/chapter2/Exercise_2.md)

>Пожалуйста, оставьте обратную связь по проекту в [форме обратной связи.](https://forms.gle/sesEw3sYThceudwh9)
