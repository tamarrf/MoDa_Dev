export const CONST = {
    websocket_port: "ws://localhost:8317",
    compiler_url: "https://public-api.gogoboard.org/logo/dev/compile",
    hid_vid: 0x0461,
    hid_pid: 0x0020,

    category_id_index: 1,
    command_id_index: 2,
    parameters_index: 3,

    board_type_index: 17,
    board_version_index: 18,
    firmware_version_index: 20,

    response_packet_type: 20,

    rcmd_get_offline_datalog: 2,
    rcmd_clear_offline_datalog: 3,

    offline_datalog_status_onprogress: 1,
    offline_datalog_status_failure: 2,
    offline_datalog_status_empty: 3,
    offline_datalog_status_file_size: 4,
    offline_datalog_status_lookup_table: 5,
    offline_datalog_status_records: 6,

    offline_datalog_record_size: 16,

    sensor_count: 4,
    sensor_start_index: 1,
}